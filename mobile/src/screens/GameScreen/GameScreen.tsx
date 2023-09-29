import { useEffect, useMemo, useReducer, useState } from "react";
import { View } from "react-native";
import clsx from "clsx";
import { AntDesign } from "@expo/vector-icons";
import { FieldZone } from "./FielZone";
import { StyledText } from "../../components/StyledText";
import { CustomButton } from "../../components/CustomButton";
import { gameResultColors } from "../../utils/shootsUtils";
import { useAppSelector } from "../../stores/store";
import { AppNavigationProp, AppRouteProp } from "../../navigators";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';
import { graphql, DocumentType, useFragment } from "../../gql";
import { GameQueryQuery, Team } from "../../gql/graphql";

const useScore = (teamState) =>
  useMemo(() => {
    const { points, goals, missed, blocked } = teamState;
    const totalPoints = points.length;
    const totalGoals = goals.length;
    const totalMissed = missed.length;
    const totalBlocked = blocked.length;
    return {
      score: `${totalGoals} - ${totalPoints}`,
      total: Number(totalPoints + totalGoals * 3),
      accuracy: Math.round(
        ((totalPoints + totalGoals) /
          (totalPoints + totalGoals + totalMissed + totalBlocked)) *
        100
      ),
    };
  }, [teamState]);

const useTeam = (initialState) =>
  useReducer(
    (current, partialState) => ({
      ...current,
      ...partialState,
    }),
    initialState
  );


const GameScreenTeamItemFragment = graphql(/* GraphQL */ `
  fragment GameScreenTeamItemFragment on Team {
    id
    teamName
    external
    category {
      name
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
                id
                team {
                  ...GameScreenTeamItemFragment
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
    queryKey: ["game", gameId],
    queryFn: async () =>
      request(
        Constants.expoConfig.extra.supabaseUrl,
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
  let team: DocumentType<typeof GameScreenTeamItemFragment> | null = null
  let opponentTeam: DocumentType<typeof GameScreenTeamItemFragment> | null = null
  if (!data) {
    return { team, opponentTeam }
  }
  const teams = data.gameCollection.edges[0].node.teamGameCollection.edges;
  const team1 = useFragment(GameScreenTeamItemFragment, teams[0].node.team);
  const team2 = useFragment(GameScreenTeamItemFragment, teams[1].node.team);
  team = team1.external ? team2 : team1;
  opponentTeam = team1.external ? team1 : team2;

  return { team, opponentTeam }
}

const Game = ({ gameId }: { gameId: number }) => {
  const [addingScore, setAddingScore] = useState<"points" | "goals" | "missed" | "blocked">();
  const [teamAState, updateTeamAState] = useTeam({
    points: [],
    goals: [],
    missed: [],
    blocked: [],
  });
  const [teamBState, updateTeamBState] = useTeam({
    points: [],
    goals: [],
    missed: [],
    blocked: [],
  });

  const teamAScore = useScore(teamAState);
  const teamBScore = useScore(teamBState);


  const handleScored = (team) => (score) => {
    if (team === "A") {
      updateTeamAState(
        score === 1
          ? { points: [...teamAState.points, { x: null, y: null }] }
          : { goals: [...teamAState.goals, { x: null, y: null }] }
      );
      setAddingScore(score === 1 ? "points" : "goals");
      return;
    }
    updateTeamBState(
      score === 1
        ? { points: [...teamBState.points, { x: null, y: null }] }
        : { goals: [...teamBState.goals, { x: null, y: null }] }
    );
  };

  const handleMissed = (action) => {
    if (action === "missed") {
      updateTeamAState({
        missed: [...teamAState.missed, { x: null, y: null }],
      });
      setAddingScore("missed");
      return;
    }
    updateTeamAState({
      blocked: [...teamAState.blocked, { x: null, y: null }],
    });
    setAddingScore("blocked");
  };

  const result = useMemo(() => {
    if (teamAScore.total > teamBScore.total) return "win";
    if (teamAScore.total < teamBScore.total) return "lose";
    return "draw";
  }, [teamAScore, teamBScore]);

  return (<>
    <FieldZone
      cn="mt-2"
      addingScore={addingScore}
      scoreAdded={setAddingScore}
      teamState={teamAState}
      updateTeamState={updateTeamAState}
      gameId={gameId}
    />
    <ScoreTable
      onTeamAScored={handleScored("A")}
      onTeamAMissed={handleMissed}
      onTeamBScored={handleScored("B")}
      teamAScore={teamAScore}
      teamBScore={teamBScore}
      teamAName="Rennes GAA"
      teamBName="Nantes A"
      result={result}
    />
  </>
  )
}
export function GameScreen({ navigation, route }: AppNavigationProp<"Games">) {
  const gameId = useRouteGameId(route);
  const { data, isLoading } = useGameQuery(gameId);

  const gameName = data?.gameCollection.edges[0].node.name;

  const { team, opponentTeam } = useTeams(data);

  const teamName = team?.teamName;
  const teamCategory = team?.category?.name;
  const opponentTeamName = opponentTeam?.teamName;


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
      <Game gameId={gameId} />
    </View>
  );
}

function ScoreTable({
  onTeamAScored,
  onTeamBScored,
  onTeamAMissed,
  teamAScore,
  teamBScore,
  teamAName,
  teamBName,
  result,
}) {
  return (
    <View
      className={clsx(
        gameResultColors[result],
        "mt-2 mx-6 p-2 border rounded-md"
      )}
    >
      <View className="flex-row justify-between">
        <TeamScore teamScore={teamAScore} name={teamAName} />
        <Timer />
        <TeamScore teamScore={teamBScore} name={teamBName} />
      </View>
      <View className="flex-row justify-between mt-2">
        <PointsControl onScored={onTeamAScored} onMissed={onTeamAMissed} />
        <PointsControl onScored={onTeamBScored} hideMissedButtons />
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

function PointsControl({ onScored, onMissed, hideMissedButtons }: {
  onScored: (score: number) => void;
  onMissed?: (action: "missed" | "blocked") => void;
  hideMissedButtons?: boolean;
}) {
  return (
    <View>
      <View className="flex-row">
        <ScoreButton score={1} onPress={() => onScored(1)} />
        {!hideMissedButtons && (
          <MissedButton label="Raté" onPress={() => onMissed("missed")} />
        )}
      </View>
      <View className="flex-row mt-1">
        <ScoreButton score={3} onPress={() => onScored(3)} />
        {!hideMissedButtons && (
          <MissedButton label="Bloqué" onPress={() => onMissed("blocked")} />
        )}
      </View>
    </View>
  );
}

function ScoreButton({ score, onPress }) {
  return (
    <CustomButton variant="contained" cn="w-10" onPress={onPress}>
      <StyledText cn="text-white">+{score}</StyledText>
    </CustomButton>
  );
}

function MissedButton({ label, onPress }) {
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
