import { useEffect, useMemo, useReducer, useState } from "react";
import { View } from "react-native";
import clsx from "clsx";
import { AntDesign } from "@expo/vector-icons";
import { AddingShoot, FieldZone, Shoot, ShootType, TeamShoots } from "./FielZone";
import { StyledText } from "../../components/StyledText";
import { CustomButton } from "../../components/CustomButton";
import { gameResultGradientColors } from "../../utils/shootsUtils";
import { useAppSelector } from "../../stores/store";
import { AppNavigationProp, AppRouteProp, useAppNavigation } from "../../navigators";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';
import { graphql, DocumentType, useFragment } from "../../gql";
import { GameQueryQuery, GameScreenTeamItemFragmentFragment, Shoots } from "../../gql/graphql";
import * as SplashScreen from "expo-splash-screen";
import { useSubscription } from "../../useSupabaseSubscription";
import { Ionicons } from '@expo/vector-icons';
import { GoHomeButton } from "../../components/GoHomeButton";
import { useNavigation } from "@react-navigation/native";

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
      type: curr.node.type,
      memberId: Number(curr.node.memberId)
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
    shootsCollection(after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
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
  query gameQuery($gameId: BigInt!, $after: Cursor) {
    gameCollection(filter: { id: { eq: $gameId } }) {
      edges {
        node {
          id
          date
          duration
          gameEnded
          name
          teamGameCollection(orderBy: [{id: DescNullsLast}]) {
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

const useInfiniteGameQuery = (gameId) => {
  const { data, ...args } = useInfiniteQuery({
    queryKey: ["game", { gameId }],
    queryFn: async ({ pageParam = null }) => {
      const res = await request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        gameQuery,
        { gameId, after: pageParam },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      )
      return res
    },
    getNextPageParam: (lastPage, allPages) => {
      // @To do handle both teamGame shoots
      const teamGameA = useFragment(GameScreenTeamItemFragment, lastPage.gameCollection.edges[0].node.teamGameCollection.edges[0].node)
      const teamGameB = useFragment(GameScreenTeamItemFragment, lastPage.gameCollection.edges[0].node.teamGameCollection.edges[1].node)
      const hasNextPageA = teamGameA.shootsCollection.pageInfo.hasNextPage;
      if (hasNextPageA) {
        return teamGameA.shootsCollection.pageInfo.endCursor
      }
      const hasNextPageB = teamGameB.shootsCollection.pageInfo.hasNextPage;
      if (hasNextPageB) {
        return teamGameB.shootsCollection.pageInfo.endCursor
      }
    }
  })

  const mergedData = useMemo<GameQueryQuery>(() => {
    return data?.pages.reduce((prev, page) => {
      if (!prev) {
        return page
      }

      function mergeShoots(prev, index) {
        // gameCollection are ordered by id assuring the match 0 -> 0, 1 -> 1
        const teamGame = useFragment(GameScreenTeamItemFragment, prev.gameCollection.edges[0].node.teamGameCollection.edges[index].node);
        const pageTeam = useFragment(GameScreenTeamItemFragment, page.gameCollection.edges[0].node.teamGameCollection.edges[index].node);
        teamGame.shootsCollection.edges.push(...pageTeam.shootsCollection.edges)
        return teamGame
      }
      const teamGameA = mergeShoots(prev, 0)
      const teamGameB = mergeShoots(prev, 1)

      prev.gameCollection.edges[0].node.teamGameCollection.edges[0].node = teamGameA
      prev.gameCollection.edges[0].node.teamGameCollection.edges[1].node = teamGameB
      return prev
    }, null)
  }, [data]);

  return { data: mergedData, ...args }
}


const useTeams = (data?: GameQueryQuery) => {
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
        const { teamGameId, type, x, y, memberId } = payload.new;
        if (Number(teamGameState.teamGameId) === Number(teamGameId)) {
          updateTeamGameState({ [`${type}Shoots`]: [...teamGameState[`${type}Shoots`], { x, y, type, memberId }] })
          break
        }
        if (opponentTeamGameState.teamGameId === teamGameId) {
          updateOpponentGameState({ [`${type}Shoots`]: [...opponentTeamGameState[`${type}Shoots`], { x, y, type, memberId }] })
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
    addingShoot: AddingShoot | null;
    setAddingShoot: React.Dispatch<React.SetStateAction<AddingShoot>>;
    gameId: number;
  }) => {
  const queryClient = useQueryClient();
  const { location, teamGameId } = useMemo(() => ({ location: addingShoot?.location, teamGameId: addingShoot?.teamGameId }), [addingShoot])

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
    onSuccess: () => {
      // @To do: invalidate games query
      queryClient.invalidateQueries({ queryKey: ["game", { gameId }] });
      setAddingShoot(null)
    },
  })

  const navigation = useAppNavigation();
  const playerId = useAppSelector((state) => state.player.playerId);

  useEffect(() => {
    if (location) {
      navigation.navigate("SelectPlayer", { teamGameId });
    }
  }, [location, teamGameId, navigation])

  useEffect(() => {
    if ((playerId || playerId === null) && addingShoot?.location) {
      mutation.mutate({ ...addingShoot.location, teamGameId: addingShoot.teamGameId, type: addingShoot.type, memberId: playerId })
    }

  }, [playerId, addingShoot])
}

const Game = ({ gameId, teamGame, opponentTeamGame, game }: {
  gameId: number,
  teamGame: DocumentType<typeof GameScreenTeamItemFragment>,
  opponentTeamGame: DocumentType<typeof GameScreenTeamItemFragment>,
  game: {
    gameEnded: boolean;
    gameId: number;
  }
}) => {
  const navigation = useNavigation()
  const [addingShoot, setAddingShoot] = useState<AddingShoot>(null);
  const [selectedShoot, setSelectedShoot] = useState<Shoot>(null)
  const [teamGameState, updateTeamGameState] = useTeamShoots(teamGame);
  const [opponentTeamGameState, updateOpponentGameState] = useTeamShoots(opponentTeamGame);
  const teamAScore = useScore(teamGameState, updateTeamGameState);
  const teamBScore = useScore(opponentTeamGameState, updateOpponentGameState);

  const handleShoot = (type: ShootType, teamGame: TeamShoots) => {
    setAddingShoot({ type, teamGameId: teamGame.teamGameId, location: null });
  };

  const handleShootPressed = (shoot: Shoot) => {
    setSelectedShoot(shoot)
  }

  const result = useMemo(() => {
    if (teamAScore.total > teamBScore.total) return "win";
    if (teamAScore.total < teamBScore.total) return "lose";
    return "draw";
  }, [teamAScore, teamBScore]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: gameResultGradientColors[result][0]
      }
    });
  }, [navigation, result]);

  useAddShootingPlayer({ addingShoot, setAddingShoot, gameId })

  useShootSubscription({ teamGameState, opponentTeamGameState, updateTeamGameState, updateOpponentGameState, gameId })

  return (<>
    <FieldZone
      cn="mt-2"
      addingShoot={addingShoot}
      setAddingShoot={setAddingShoot}
      teamGameState={teamGameState}
      onPress={handleShootPressed}
    />
    <SelectedShootOverview shoot={selectedShoot} />
    <ScoreTable
      onShoot={handleShoot}
      teamAScore={teamAScore}
      teamBScore={teamBScore}
      teamAName={teamGame.team.teamName}
      teamBName={opponentTeamGame.team.teamName}
      disabled={Boolean(addingShoot)}
      game={game}
    />
  </>
  )
}

const SelectedShootOverview = ({ shoot }: { shoot?: Shoot }) => {
  if (!shoot) return <View className="grow" />
  return (
    <View className="grow">
      <StyledText>{shoot.memberId}</StyledText>
      <StyledText>{shoot.type}</StyledText>
    </View>
  )
}

export function GameScreen({ navigation, route }: AppNavigationProp<"Games">) {
  const gameId = useRouteGameId(route);
  const { data, isFetching } = useInfiniteGameQuery(gameId);

  const { teamGame, opponentTeamGame } = useTeams(data);

  const game = data?.gameCollection.edges[0].node;
  const gameName = data?.gameCollection.edges[0].node.name;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: gameName || "Game",
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => <GoHomeButton />,
    });
  }, [navigation, gameName]);

  if (isFetching) { return null; }

  return (
    <View className="flex-1">
      <Game gameId={gameId} teamGame={teamGame} opponentTeamGame={opponentTeamGame} game={{ gameEnded: game.gameEnded, gameId: game.id }} />
    </View>
  );
}

function ScoreTable({
  onShoot,
  teamAScore,
  teamBScore,
  teamAName,
  teamBName,
  disabled,
  game
}: {
  onShoot: (type: ShootType, teamGame: TeamShoots) => void;
  teamAScore: ReturnType<typeof useScore>;
  teamBScore: ReturnType<typeof useScore>;
  teamAName: string;
  teamBName: string;
  disabled: boolean;
  game: {
    gameEnded: boolean;
    gameId: number;
  }
}) {
  return (
    <View
      className={clsx(
        "mt-2 p-2 rounded-xl bg-white",
        disabled && "opacity-50"
      )}
    >
      <View className="flex-row">
        <View className="w-2/5">
          <TeamScore teamScore={teamAScore} name={teamAName} />
        </View>
        <View className="w-1/5">
          <Timer game={game} />
        </View>
        <View className="w-2/5">
          <TeamScore teamScore={teamBScore} name={teamBName} />
        </View>
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

const GameEndedMutation = graphql(/* GraphQL */ `
mutation GameEndedMutation($gameId: BigInt!, $gameEnded: Boolean!) {
  updateGameCollection(set: {gameEnded: $gameEnded}, filter: {id: {eq: $gameId}}){
    records {
      id
      gameEnded
    }
  }
}
`);

function Timer({ game: { gameEnded, gameId } }: {
  game: {
    gameEnded: boolean;
    gameId: number;
  }
}) {
  const [gameInProgress, setGameInProgress] = useState(!gameEnded)
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () =>
      request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        GameEndedMutation,
        { gameEnded: gameInProgress, gameId },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      ),
    onSuccess: (rsp) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      setGameInProgress(!gameInProgress)
    },
  })

  return (
    <View className="flex items-center">
      <View className="border-b">
        <StyledText>60&apos;</StyledText>
      </View>
      {<CustomButton onPress={() => mutation.mutate()}>
        {!gameInProgress ? <AntDesign name="playcircleo" size={24} color="#DF8C5F" /> : <Ionicons name="stop-circle-outline" size={24} color="#DF8C5F" />}
      </CustomButton>}
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
    <CustomButton variant="contained" cn="w-18" onPress={onPress}
      color="#E3BBA6"
    >
      <StyledText cn="text-gray-600">+{score}</StyledText>
    </CustomButton>
  );
}

function MissedButton({ label, onPress }: {
  label: string;
} & Omit<React.ComponentProps<typeof CustomButton>, "children">) {
  return (
    <CustomButton
      variant="outlined"
      cn="ml-1 w-24"
      // cn="bg-gray-400 ml-1 w-24"
      onPress={onPress}
    >
      <StyledText cn="text-gray-600">{label}</StyledText>
    </CustomButton>
  );
}
