import { useEffect, useMemo, useReducer, useState } from "react";
import { View } from "react-native";
import clsx from "clsx";
import { AntDesign } from "@expo/vector-icons";
import { AddingShoot, FieldZone, ShootType, TeamShoots } from "./FielZone";
import { StyledText } from "../../components/StyledText";
import { CustomButton } from "../../components/CustomButton";
import { gameResultColors } from "../../utils/shootsUtils";
import { useAppSelector } from "../../stores/store";
import { AppNavigationProp, AppRouteProp, useAppNavigation } from "../../navigators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';
import { graphql, DocumentType, useFragment } from "../../gql";
import { GameQueryQuery, Shoots } from "../../gql/graphql";
import * as SplashScreen from "expo-splash-screen";
import { useSubscription } from "../../useSupabaseSubscription";

SplashScreen.preventAutoHideAsync();

const useScore = (teamGameState: TeamShoots, updateTeamGame: React.Dispatch<Partial<TeamShoots>>) =>
  useMemo(() => {
    const { pointShoots, goalShoots, missedShoots, blockedShoots } = teamGameState;
    const totalPoints = pointShoots.length;
    const totalGoals = goalShoots.length;
    const totalMissed = missedShoots.length;
    const totalBlocked = blockedShoots.length;
    return {
      score: `${totalGoals} - ${totalPoints}`,
      total: Number(totalPoints + totalGoals * 3),
      accuracy: Math.round(
        ((totalPoints + totalGoals) /
          (totalPoints + totalGoals + totalMissed + totalBlocked)) *
        100
      ),
      teamGameState,
      updateTeamGame
    };
  }, [teamGameState]);



const useTeamShoots = (teamGame: DocumentType<typeof GameScreenTeamItemFragment>): [state: TeamShoots, update: React.Dispatch<Partial<TeamShoots>>] => {
  const initialState = teamGame.shootsCollection.edges.reduce((prev, curr) => {
    prev[`${curr.node.type}Shoots`].push({
      x: Number(curr.node.x),
      y: Number(curr.node.y),
    })
    return prev;
  }, {
    pointShoots: [],
    goalShoots: [],
    missedShoots: [],
    blockedShoots: [],
    teamGameId: teamGame.id
  })

  const reducer = useReducer(
    (current: TeamShoots, partialState: Partial<TeamShoots>) => {
      console.log("UPT ---")
      return ({
        ...current,
        ...partialState,
      })
    },
    initialState
  )

  return reducer
};


const GameScreenTeamItemFragment = graphql(/* GraphQL */ `
  fragment GameScreenTeamItemFragment on TeamGame {
    id
    team {
      id
      teamName
      external
      category {
        name
      }
    }
    teamMembersCollection {
      edges {
        node {
          id
          member {
            id
            firstName
            lastName
          }
        }
      }
    }
    shootsCollection {
      edges {
        node {
          id
          x
          y
          type
          memberId
        }
      }
    }
  }
`)

const gameQuery = graphql(/* GraphQL */ `
  query gameQuery($gameId: BigInt!) {
    gameCollection(filter: { id: { eq: $gameId } }) {
      edges {
        node {
          id
          date
          duration
          gameEnded
          name
          teamGameCollection {
            edges {
              node {
                ...GameScreenTeamItemFragment
              }
            }
          }
        }
      }
    }
  }
`)


const useRouteGameId = (route: AppRouteProp<"Games">) => {
  return route.params.gameId;
};

const useGameQuery = (gameId) => {
  return useQuery({
    queryKey: ["game", { gameId }],
    queryFn: async () =>
      request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        gameQuery,
        { gameId },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      ),
  })
}


const useTeams = (data: GameQueryQuery) => {
  let teamGame: DocumentType<typeof GameScreenTeamItemFragment> | null = null
  let opponentTeamGame: DocumentType<typeof GameScreenTeamItemFragment> | null = null
  if (!data) {
    return { teamGame, opponentTeamGame }
  }
  const teams = data.gameCollection.edges[0].node.teamGameCollection.edges;
  const teamGame1 = useFragment(GameScreenTeamItemFragment, teams[0].node);
  const teamGame2 = useFragment(GameScreenTeamItemFragment, teams[1].node);
  teamGame = teamGame1.team.external ? teamGame2 : teamGame1;
  opponentTeamGame = teamGame1.team.external ? teamGame1 : teamGame2;

  return { teamGame, opponentTeamGame }
}

const AddShootMutation = graphql(/* GraphQL */ `
  mutation AddShootMutation($x: BigInt!, $y: BigInt!, $type: String!, $teamGameId: BigInt!, $memberId: BigInt!) {
    insertIntoShootsCollection(objects: {x: $x, y: $y, type: $type, teamGameId: $teamGameId, memberId: $memberId}) {
      records {
        id
      }
    }
  }
`);

const useShootSubscription = ({ teamGameState, opponentTeamGameState, updateTeamGameState, updateOpponentGameState, gameId }:
  { teamGameState: TeamShoots, opponentTeamGameState: TeamShoots, updateTeamGameState: React.Dispatch<Partial<TeamShoots>>, updateOpponentGameState: React.Dispatch<Partial<TeamShoots>>, gameId: number }) => {
  const queryClient = useQueryClient();

  useSubscription<Pick<Shoots, "id" | "created_at" | "memberId" | "x" | "y" | "type" | "teamGameId">>({
    table: 'Shoots',
    filter: `teamGameId=in.(${teamGameState.teamGameId},${opponentTeamGameState.teamGameId})`
  }, (payload) => {
    switch (payload.eventType) {
      case "INSERT":
        const { teamGameId, type, x, y } = payload.new;
        if (Number(teamGameState.teamGameId) === Number(teamGameId)) {
          updateTeamGameState({ [`${type}Shoots`]: [...teamGameState[`${type}Shoots`], { x, y }] })
          break
        }
        if (opponentTeamGameState.teamGameId === teamGameId) {
          updateOpponentGameState({ [`${type}Shoots`]: [...opponentTeamGameState[`${type}Shoots`], { x, y }] })
          break
        }
        console.warn("No team matched for this insert")
        break;

      case "UPDATE": // @To do: update the shoot
      case "DELETE": // @To do: delete the shoot
      default:
        console.warn("No match for this subscription event")
        break;
    }
    queryClient.invalidateQueries({ queryKey: ["game", { gameId }], exact: true });
  })
}

const useAddShootingPlayer = ({ addingShoot,
  setAddingShoot, gameId }: {
    addingShoot: AddingShoot;
    setAddingShoot: React.Dispatch<React.SetStateAction<AddingShoot>>;
    gameId: number;
  }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ x, y, teamGameId, type, memberId }: Pick<Shoots, "x" | "y" | "teamGameId" | "type" | "memberId">) =>
      request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        AddShootMutation,
        { x, y, teamGameId, type, memberId },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      ),
    onSuccess: (rsp) => {
      // @To do: invalidate games query
      queryClient.invalidateQueries({ queryKey: ["game", { gameId }] });
      setAddingShoot(null)
    },
  })

  const navigation = useAppNavigation();
  const playerId = useAppSelector((state) => state.player.playerId);

  useEffect(() => {
    if (addingShoot?.location) {
      navigation.navigate("SelectPlayer", { teamGameId: addingShoot.teamGameId });
    }
  }, [addingShoot, navigation])

  // Use store to get the selected player & save it & reset addingShoot
  useEffect(() => {
    if (playerId && addingShoot?.location) {
      // To do : save the shoot & update the teamGameState
      mutation.mutate({ ...addingShoot.location, teamGameId: addingShoot.teamGameId, type: addingShoot.type, memberId: playerId })
    }

  }, [playerId, addingShoot])
}

const Game = ({ gameId, teamGame, opponentTeamGame }: {
  gameId: number,
  teamGame: DocumentType<typeof GameScreenTeamItemFragment>,
  opponentTeamGame: DocumentType<typeof GameScreenTeamItemFragment>
}) => {
  const [addingShoot, setAddingShoot] = useState<AddingShoot>(null);
  const [teamGameState, updateTeamGameState] = useTeamShoots(teamGame);
  const [opponentTeamGameState, updateOpponentGameState] = useTeamShoots(opponentTeamGame);
  const teamAScore = useScore(teamGameState, updateTeamGameState);
  const teamBScore = useScore(opponentTeamGameState, updateOpponentGameState);

  const handleShoot = (type: ShootType, teamGame: TeamShoots) => {
    setAddingShoot({ type, teamGameId: teamGame.teamGameId, location: null });
  };

  const result = useMemo(() => {
    if (teamAScore.total > teamBScore.total) return "win";
    if (teamAScore.total < teamBScore.total) return "lose";
    return "draw";
  }, [teamAScore, teamBScore]);

  useAddShootingPlayer({ addingShoot, setAddingShoot, gameId })

  useShootSubscription({ teamGameState, opponentTeamGameState, updateTeamGameState, updateOpponentGameState, gameId })

  return (<>
    <FieldZone
      cn="mt-2"
      addingShoot={addingShoot}
      setAddingShoot={setAddingShoot}
      teamGameState={teamGameState}
    />
    <ScoreTable
      onShoot={handleShoot}
      teamAScore={teamAScore}
      teamBScore={teamBScore}
      teamAName="Rennes GAA"
      teamBName="Nantes A"
      result={result}
      disabled={Boolean(addingShoot)}
    />
  </>
  )
}
export function GameScreen({ navigation, route }: AppNavigationProp<"Games">) {
  const gameId = useRouteGameId(route);
  const { data, isLoading } = useGameQuery(gameId);

  const gameName = data?.gameCollection.edges[0].node.name;

  const { teamGame, opponentTeamGame } = useTeams(data);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: gameName || "Game",
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <CustomButton
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <AntDesign name="home" size={24} color="black" />
        </CustomButton>
      ),
    });
  }, [navigation, gameName]);

  if (isLoading) { return null; }

  return (
    <View className="flex-1">
      <Game gameId={gameId} teamGame={teamGame} opponentTeamGame={opponentTeamGame} />
    </View>
  );
}

function ScoreTable({
  onShoot,
  teamAScore,
  teamBScore,
  teamAName,
  teamBName,
  result,
  disabled,
}: {
  onShoot: (type: ShootType, teamGame: TeamShoots) => void;
  teamAScore: ReturnType<typeof useScore>;
  teamBScore: ReturnType<typeof useScore>;
  teamAName: string;
  teamBName: string;
  result: "win" | "lose" | "draw";
  disabled: boolean;
}) {
  return (
    <View
      className={clsx(
        gameResultColors[result],
        "mt-2 mx-6 p-2 border rounded-md",
        disabled && "opacity-50"
      )}
    >
      <View className="flex-row justify-between">
        <TeamScore teamScore={teamAScore} name={teamAName} />
        <Timer />
        <TeamScore teamScore={teamBScore} name={teamBName} />
      </View>
      <View className="flex-row justify-between mt-2">
        <PointsControl onShoot={(type) => onShoot(type, teamAScore.teamGameState)} disabled={disabled} />
        <PointsControl onShoot={(type) => onShoot(type, teamBScore.teamGameState)} hideMissedButtons disabled={disabled} />
      </View>
    </View>
  );
}

function TeamScore({ teamScore, name }) {
  return (
    <View className="w-28 flex justify-center items-center">
      <View>
        <StyledText>{name}</StyledText>
      </View>
      <View className="">
        <StyledText>{teamScore.score}</StyledText>
      </View>
      <View>
        <StyledText cn="font text-xs">
          {teamScore.total}{" "}
          {teamScore.accuracy ? `Accuracy: ${teamScore.accuracy}%` : null}
        </StyledText>
      </View>
    </View>
  );
}

function Timer() {
  return (
    <View>
      <View className="border-b">
        <StyledText>60&apos;</StyledText>
      </View>
    </View>
  );
}

function PointsControl({ onShoot, hideMissedButtons, disabled }: {
  onShoot: (shoot: ShootType) => void;
  hideMissedButtons?: boolean;
  disabled?: boolean;
}) {
  return (
    <View>
      <View className="flex-row">
        <ScoreButton score={1} onPress={() => onShoot("point")} disabled={disabled} />
        {!hideMissedButtons && (
          <MissedButton label="Raté" onPress={() => onShoot("missed")} />
        )}
      </View>
      <View className="flex-row mt-1">
        <ScoreButton score={3} onPress={() => onShoot("goal")} />
        {!hideMissedButtons && (
          <MissedButton label="Bloqué" onPress={() => onShoot("blocked")} />
        )}
      </View>
    </View>
  );
}

function ScoreButton({ score, onPress }: {
  score: string | number;
} & Omit<React.ComponentProps<typeof CustomButton>, "children">) {
  return (
    <CustomButton variant="contained" cn="w-10" onPress={onPress}>
      <StyledText cn="text-white">+{score}</StyledText>
    </CustomButton>
  );
}

function MissedButton({ label, onPress }: {
  label: string;
} & Omit<React.ComponentProps<typeof CustomButton>, "children">) {
  return (
    <CustomButton
      variant="contained"
      cn="bg-gray-400 ml-1 w-20"
      onPress={onPress}
    >
      <StyledText cn="text-white">{label}</StyledText>
    </CustomButton>
  );
}
