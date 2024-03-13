import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import { useClubIdContext } from "../providers/ClubIdProvider";
import {
  ControlledLabelledTextInput,
  ControlledSelect,
} from "../components/ControlledComponents";
import { StyledText } from "../components/StyledText";
import { resetGame } from "../stores";
import { CategoryFilter } from "../components/CategoryFilter";
import { SectionContainer } from "../components/SectionContainer";
import { AppNavigationProp } from "../navigators";
import { useSupabaseClientContext } from "../providers/useSupabaseClient";
import { useGameStoreParamWatcher } from "../hooks/useGameStoreParamWatcher";

const TEAM = "team";
const OPPONENT_TEAM = "opponentTeam";
const PLAYERS = "players";

type FormValues = {
  date: string;
  duration?: number;
  gameName?: string;
  [TEAM]: { id: number; teamName: string };
  [OPPONENT_TEAM]: { id: number; teamName: string };
  [PLAYERS]: number[];
};

type GameMutation = {
  date: DateTime;
  duration: number;
  name: string;
};

// @To-do: handle game between internal teams
export function AddGame({ navigation }: AppNavigationProp<"AddGame">) {
  const [categoryId, setCategoryId] = useState(1);
  const clubId = useClubIdContext();
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset, getValues } = useForm<FormValues>({
    defaultValues: {
      date: DateTime.now().toJSDate().toISOString(),
      duration: 60,
      [PLAYERS]: [],
      [TEAM]: null,
      [OPPONENT_TEAM]: null,
    },
  });
  const supabaseClient = useSupabaseClientContext();

  const teamMembersMutation = useMutation({
    mutationFn: async (
      teamMembers: { teamGameId: number; memberId: number }[],
    ) => {
      const result = await supabaseClient
        .from("TeamMembers")
        .insert(teamMembers);
      return result.data;
    },
  });

  const teamGameMutation = useMutation({
    mutationFn: async ({
      teamId,
      gameId,
      teamId2,
    }: {
      teamId: number;
      gameId: number;
      teamId2: number;
    }) => {
      const result = await supabaseClient
        .from("TeamGame")
        .insert([
          {
            teamId,
            gameId,
          },
          {
            teamId: teamId2,
            gameId,
          },
        ])
        .select("id, teamId");
      return result.data;
    },
  });

  const gameMutation = useMutation({
    mutationFn: async ({ date, duration, name }: GameMutation) => {
      const result = await supabaseClient
        .from("Game")
        .insert({
          date: date.toISO(),
          duration,
          name,
          gameEnded: false,
          clubId,
        })
        .select("*");
      return result.data;
    },
  });

  const dispatch = useDispatch();

  const handleOnPress: SubmitHandler<FormValues> = async (data) => {
    const gameData = await gameMutation.mutateAsync({
      date: DateTime.fromISO(data.date),
      duration: Number(data.duration),
      name: data.gameName ?? "",
    } as GameMutation);

    const formValues = getValues();
    const gameId = Number(gameData[0].id);
    const teamData = await teamGameMutation.mutateAsync({
      teamId: Number(formValues.team.id),
      gameId,
      teamId2: Number(formValues.opponentTeam.id),
    });

    const teamGame = teamData[0];
    const teamGameId = Number(teamGame?.id);
    const teamMembers = formValues.players.map((playerId) => ({
      memberId: playerId,
      teamGameId,
    }));

    await teamMembersMutation.mutateAsync(teamMembers);

    queryClient.invalidateQueries({ queryKey: ["games"] });
    navigation.navigate("Game", {
      gameResult: {
        ...gameData[0],
        teamGame: {
          gameResults: [],
          teamName: formValues[TEAM].teamName,
          external: false,
          categoryId,
          actionsCountByType: {
            blockedCount: 0,
            goalCount: 0,
            missedCount: 0,
            pointCount: 0,
          },
        },
        opponentTeamGame: {
          gameResults: [],
          teamName: formValues[OPPONENT_TEAM].teamName,
          external: true,
          categoryId,
          actionsCountByType: {
            blockedCount: 0,
            goalCount: 0,
            missedCount: 0,
            pointCount: 0,
          },
        },
        outcome: "draw",
      },
      isOpponentTeamSelected: false,
    });
  };

  const onCategoryChange = (newCategoryId: number) => {
    dispatch(resetGame());
    reset({
      team: null,
      opponentTeam: null,
      players: [],
    });
    setCategoryId(newCategoryId);
  };

  useGameStoreParamWatcher({
    control,
    name: PLAYERS,
    rules: { required: "Au moins un joueur est obligatoire" },
    defaultValue: [],
    onChange: (value) => value,
  });

  useGameStoreParamWatcher({
    control,
    name: TEAM,
    rules: { required: "L'équipe est obligatoire" },
    onChange: (value) => value,
  });
  useGameStoreParamWatcher({
    control,
    name: OPPONENT_TEAM,
    rules: { required: "L'équipe adverse est obligatoire" },
    onChange: (value) => value,
  });

  useEffect(() => {
    return () => {
      dispatch(resetGame());
    };
  }, []);

  const renderTeam = (value: FormValues[typeof TEAM]) => (
    <StyledText cn={clsx(value ? "text-gray-600" : "text-gray-300")}>
      {value ? value.teamName : "Equipe A"}
    </StyledText>
  );

  return (
    <>
      <CategoryFilter onPress={onCategoryChange} categoryId={categoryId} />
      <KeyboardAwareScrollView>
        <SectionContainer>
          <Card cn="w-full">
            <ControlledSelect
              onPress={() => {
                navigation.navigate("Teams", {
                  mode: "select",
                  categoryId,
                  external: false,
                });
              }}
              label="Equipe *"
              control={control}
              rules={{ required: "L'équipe est obligatoire" }}
              name={TEAM}
              renderValue={renderTeam}
            />
            <ControlledSelect
              onPress={() => {
                navigation.navigate("Teams", {
                  mode: "select",
                  categoryId,
                  external: true,
                });
              }}
              label="Equipe adverse *"
              control={control}
              rules={{ required: "L'équipe adverse est obligatoire" }}
              name={OPPONENT_TEAM}
              renderValue={renderTeam}
            />
            <ControlledSelect
              onPress={() => {
                navigation.navigate("SelectMembers", {
                  mode: "select",
                  categoryId,
                });
              }}
              label="Joueurs *"
              control={control}
              rules={{ required: "Au moins un joueur est obligatoire" }}
              name={PLAYERS}
              renderValue={(value: unknown[] = []) => (
                <View
                  className={clsx(
                    value.length ? "bg-[#AB6C49]" : "bg-gray-400",
                    "rounded-lg",
                  )}
                >
                  <StyledText cn={clsx("text-white px-1 overflow-hidden")}>
                    {value.length}
                  </StyledText>
                </View>
              )}
            />
            <ControlledSelect
              label="Date *"
              dateType
              control={control}
              rules={{ required: "La date est obligatoire" }}
              name="date"
              renderValue={(value: string) => (
                <StyledText>
                  {DateTime.fromISO(value).toFormat("dd-MM-yyyy")}
                </StyledText>
              )}
            />
            <ControlledLabelledTextInput
              label="Durée du match *"
              inputProps={{
                placeholder: "60",
                keyboardType: "number-pad",
              }}
              control={control}
              rules={{ required: "La durée est obligatoire" }}
              name="duration"
            />
            <ControlledLabelledTextInput
              label="Compétition"
              inputProps={{
                placeholder: "Coupe de bretagne",
                keyboardType: "default",
              }}
              control={control}
              name="gameName"
            />
          </Card>
        </SectionContainer>
        <View className="mt-8 flex-1 justify-end items-center pb-8">
          <CustomButton
            variant="contained"
            onPress={handleSubmit(handleOnPress)}
            strong
          >
            <Text className="text-white text-lg">Let&apos;s go</Text>
          </CustomButton>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
