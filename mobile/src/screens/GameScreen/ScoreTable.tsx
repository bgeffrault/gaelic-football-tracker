import clsx from "clsx";
import { TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StyledText } from "../../components/StyledText";
import { CustomButton } from "../../components/CustomButton";
import { ShootType, TeamShoots } from "./FielZone";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";
import { Shoot } from "../../domain/types";

export type TeamShootAction = {
  type: "ADD_POINT" | "ADD_GOAL" | "ADD_MISSED" | "ADD_BLOCKED";
  payload: Shoot;
};

export const useScore = (
  teamGameState: TeamShoots,
  updateTeamGame: React.Dispatch<TeamShootAction>,
) =>
  useMemo(() => {
    const { pointShoots, goalShoots, missedShoots, blockedShoots } =
      teamGameState;
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
          100,
      ),
      teamGameState,
      updateTeamGame,
    };
  }, [teamGameState]);

type TeamScore = ReturnType<typeof useScore>;

function MissedButton({
  label,
  onPress,
}: {
  label: string;
} & Omit<React.ComponentProps<typeof CustomButton>, "children">) {
  return (
    <CustomButton variant="outlined" cn="ml-1 w-24" onPress={onPress}>
      <StyledText cn="text-gray-500">{label}</StyledText>
    </CustomButton>
  );
}

function ScoreButton({
  score,
  onPress,
}: {
  score: string | number;
} & Omit<React.ComponentProps<typeof CustomButton>, "children">) {
  return (
    <CustomButton variant="contained" cn="w-18" onPress={onPress}>
      <StyledText cn="text-gray-500">+{score}</StyledText>
    </CustomButton>
  );
}

function PointsControl({
  onShoot,
  disabled,
}: {
  onShoot: (shoot: ShootType) => void;
  disabled?: boolean;
}) {
  return (
    <View>
      <View className="flex-row">
        <ScoreButton
          score={1}
          onPress={() => onShoot("point")}
          disabled={disabled}
        />
        <MissedButton label="Missed" onPress={() => onShoot("missed")} />
      </View>
      <View className="flex-row mt-1">
        <ScoreButton score={3} onPress={() => onShoot("goal")} />
        <MissedButton label="Blocked" onPress={() => onShoot("blocked")} />
      </View>
    </View>
  );
}

function Timer({
  game: { gameEnded, gameId, duration },
}: {
  game: {
    gameEnded: boolean;
    gameId: number;
    duration: number;
  };
}) {
  const [gameInProgress, setGameInProgress] = useState(!gameEnded);
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClientContext();

  const mutation = useMutation({
    mutationFn: async (hasEnded: boolean) => {
      const result = await supabaseClient
        .from("Game")
        .update({ gameEnded: hasEnded })
        .eq("id", gameId);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      setGameInProgress(!gameInProgress);
    },
  });

  return (
    <View className="flex items-center">
      <View className="border-b">
        <StyledText>{duration}&apos;</StyledText>
      </View>
      <CustomButton onPress={() => mutation.mutate(!gameInProgress)}>
        {!gameInProgress ? (
          <AntDesign name="playcircleo" size={24} color="#DF8C5F" />
        ) : (
          <Ionicons name="stop-circle-outline" size={24} color="#DF8C5F" />
        )}
      </CustomButton>
    </View>
  );
}

type TeamScoreProps = {
  teamScore: TeamScore;
  name: string;
  isOpponent?: boolean;
  setIsOpponentTeamSelected: Dispatch<SetStateAction<boolean>>;
  isOpponentTeamSelected: boolean;
};

function TeamScoreDisplay({
  teamScore,
  name,
  isOpponent = false,
  setIsOpponentTeamSelected,
  isOpponentTeamSelected,
}: TeamScoreProps) {
  const isSelected = isOpponent
    ? isOpponentTeamSelected
    : !isOpponentTeamSelected;
  return (
    <TouchableOpacity
      className={clsx(
        "w-full py-2",
        isSelected && "bg-[#e3bba646]",
        isOpponent ? "rounded-bl-xl" : "rounded-br-xl",
      )}
      onPress={() => setIsOpponentTeamSelected(isOpponent)}
    >
      <View className="flex justify-center items-center">
        <View>
          <StyledText>{name}</StyledText>
        </View>
        <View className="flex-row">
          <StyledText>{teamScore.score}</StyledText>
          <StyledText cn="text-gray-400 ml-2">({teamScore.total})</StyledText>
        </View>
        <View>
          <StyledText cn="font text-xs text-gray-400">
            {teamScore.accuracy ? `Accuracy: ${teamScore.accuracy}%` : null}
          </StyledText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function ScoreTable({
  onShoot,
  teamScore,
  opponentTeamScore,
  teamName,
  opponentTeamName,
  addingShoot,
  game,
  setIsOpponentTeamSelected,
  isOpponentTeamSelected,
}: {
  onShoot: (type: ShootType, teamGame: TeamShoots, isOpponent: boolean) => void;
  teamScore: ReturnType<typeof useScore>;
  opponentTeamScore: ReturnType<typeof useScore>;
  teamName: string;
  opponentTeamName: string;
  addingShoot: boolean;
  game: {
    gameEnded: boolean;
    gameId: number;
    duration: number;
  };
  setIsOpponentTeamSelected: React.Dispatch<React.SetStateAction<boolean>>;
  isOpponentTeamSelected: boolean;
}) {
  return (
    <View
      className={clsx("mt-2 rounded-xl bg-white", addingShoot && "opacity-50")}
    >
      <View className="flex-row">
        <View className="w-2/5">
          <TeamScoreDisplay
            teamScore={teamScore}
            name={teamName}
            isOpponentTeamSelected={isOpponentTeamSelected}
            setIsOpponentTeamSelected={setIsOpponentTeamSelected}
          />
        </View>
        <View className="w-1/5">
          <Timer game={game} />
        </View>
        <View className="w-2/5">
          <TeamScoreDisplay
            teamScore={opponentTeamScore}
            name={opponentTeamName}
            isOpponent
            isOpponentTeamSelected={isOpponentTeamSelected}
            setIsOpponentTeamSelected={setIsOpponentTeamSelected}
          />
        </View>
      </View>
      <View className="flex-row justify-between mt-2 p-2">
        <PointsControl
          onShoot={(type) => onShoot(type, teamScore.teamGameState, false)}
          disabled={addingShoot}
        />
        <PointsControl
          onShoot={(type) =>
            onShoot(type, opponentTeamScore.teamGameState, true)
          }
          disabled={addingShoot}
        />
      </View>
    </View>
  );
}
