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

const useGame = (route: AppRouteProp<"Games">) => {
  const gameId = route.params.gameId;
  const game = useAppSelector((state) =>
    state.games.gameList.find((g) => g.id === gameId)
  );
  return game;
};

const useTeamName = () => useAppSelector((state) => state.club.teamName);

export function GameScreen({ navigation, route }: AppNavigationProp<"Games">) {
  const game = useGame(route);
  const teamName = useTeamName();

  const [addingScore, setAddingScore] = useState<"points" | "goals" | "missed" | "blocked">();
  const [teamAState, updateTeamAState] = useTeam(game.teamsScore.us);
  const [teamBState, updateTeamBState] = useTeam(game.teamsScore.them);

  const teamAScore = useScore(teamAState);
  const teamBScore = useScore(teamBState);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${teamName} vs ${game.opponentName}`,
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
  }, [navigation]);

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

  return (
    <View className="flex-1">
      <FieldZone
        cn="mt-2"
        addingScore={addingScore}
        scoreAdded={setAddingScore}
        teamState={teamAState}
        updateTeamState={updateTeamAState}
        gameId={game.id}
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
