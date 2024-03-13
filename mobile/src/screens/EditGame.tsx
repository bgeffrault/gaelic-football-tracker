import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import difference from "lodash/difference";
import xor from "lodash/xor";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import {
  ControlledLabelledTextInput,
  ControlledSelect,
} from "../components/ControlledComponents";
import { StyledText } from "../components/StyledText";
import { SectionContainer } from "../components/SectionContainer";
import { AppNavigationProp, useAppNavigation } from "../navigators";
import { useSupabaseClientContext } from "../providers/useSupabaseClient";
import { Team } from "../types/Team";
import { MemberType } from "../domain/types";
import { useGameStoreParamWatcher } from "../hooks/useGameStoreParamWatcher";

const TEAM = "team";
const OPPONENT_TEAM = "opponentTeam";
const PLAYERS = "players";

type GameType = {
  categoryId: number;
  clubId: number;
  created_at: string;
  date: string;
  duration: number;
  gameEnded: boolean;
  id: number;
  name: string;
  TeamGame: {
    created_at: string;
    gameId: number;
    id: number;
    teamId: number;
    Team: {
      id: number;
      teamName: string;
    };
    Members: MemberType[];
  }[];
};

const useGame = (gameId: number) => {
  const supabaseClient = useSupabaseClientContext();
  const { data: game, ...queryResults } = useQuery({
    queryKey: ["game supabaseClient", { gameId }],
    queryFn: async () => {
      const result = await supabaseClient
        .from("Game")
        .select("*, TeamGame(*, Team(id, teamName), TeamMembers(Members(*)))")
        .order("id", { referencedTable: "TeamGame", ascending: true })
        .filter("id", "eq", gameId)
        .limit(1)
        .single();
      const data = { ...result.data } as GameType & typeof result.data;
      result.data.TeamGame.forEach((tg, index) => {
        data.TeamGame[index].Members = tg.TeamMembers.map((tm) => tm.Members);
      });
      return data;
    },
  });

  return { game, ...queryResults };
};

type Input = {
  date: string;
  duration: number;
  name: string;
  [TEAM]: { id: number; teamName: string };
  [OPPONENT_TEAM]: { id: number; teamName: string };
  [PLAYERS]: MemberType[];
};

function Game({ game }: { game: GameType }) {
  const navigation = useAppNavigation();
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm<Input>({
    defaultValues: {
      date: game.date,
      duration: game.duration,
      name: game.name,
      [TEAM]: game.TeamGame[0].Team, // @To do: adjust with external team
      [OPPONENT_TEAM]: game.TeamGame[1].Team,
      [PLAYERS]: game.TeamGame[0].Members, // @To do: adjust with external team
    },
  });

  const supabaseClient = useSupabaseClientContext();
  const { mutateAsync } = useMutation({
    mutationFn: async (values: Input) => {
      const { players, team, opponentTeam, ...updatedGame } = values;
      const { duration, date, name } = updatedGame;
      const queries = [];
      if (
        duration !== game.duration ||
        date !== game.date ||
        name !== game.name
      ) {
        const gameQuery = supabaseClient
          .from("Game")
          .update({ ...updatedGame })
          .eq("id", game.id);
        queries.push(gameQuery);
      }

      const teamId = (team as unknown as () => Input[typeof TEAM])().id;
      if (teamId !== game.TeamGame[0].teamId) {
        const updateTeamQuery = supabaseClient
          .from("TeamGame")
          .update({ teamId })
          .eq("id", game.TeamGame[0].id);
        queries.push(updateTeamQuery);
      }

      const opponentTeamId = (
        opponentTeam as unknown as () => Input[typeof OPPONENT_TEAM]
      )().id;
      if (opponentTeamId !== game.TeamGame[1].teamId) {
        const updateTeamQuery = supabaseClient
          .from("TeamGame")
          .update({ teamId: opponentTeamId })
          .eq("id", game.TeamGame[1].id);
        queries.push(updateTeamQuery);
      }

      const playerIds = (players as unknown as () => MemberType[])().map(
        (p) => p.id,
      );
      const prevPlayersIds = game.TeamGame[0].Members.map((m) => m.id);

      if (xor(playerIds, prevPlayersIds).length !== 0) {
        const deletePlayersQuery = supabaseClient
          .from("TeamMembers")
          .delete()
          .not("memberId", "in", playerIds);

        const newPlayersIds = difference(
          playerIds,
          game.TeamGame[0].Members.map((m) => m.id),
        );

        const insertPlayersQuery = supabaseClient.from("TeamMembers").insert(
          newPlayersIds.map((pId) => ({
            memberId: pId,
            teamGameId: game.TeamGame[0].id,
          })),
        );

        queries.push(deletePlayersQuery, insertPlayersQuery);
      }

      await Promise.all(queries);

      queryClient.invalidateQueries(["game shoots", { gameId: game.id }]);
      queryClient.invalidateQueries([
        "game supabaseClient",
        { gameId: game.id },
      ]);
    },
  });

  const onSubmit = async (values: Input) => {
    await mutateAsync(values);
    navigation.goBack();
  };

  useGameStoreParamWatcher({
    control,
    name: PLAYERS,
    defaultValue: game.TeamGame[0].Members,
  });
  useGameStoreParamWatcher({
    control,
    name: TEAM,
    defaultValue: game.TeamGame[0].Team,
  });
  useGameStoreParamWatcher({
    control,
    name: OPPONENT_TEAM,
    defaultValue: game.TeamGame[1].Team,
  });

  const renderTeam = (value: Team) => (
    <StyledText cn="text-gray-400">
      {value ? value.teamName : "Equipe A"}
    </StyledText>
  );

  return (
    <View className="flex-1">
      <KeyboardAwareScrollView>
        <View className="mt-3">
          <SectionContainer>
            <Card cn="w-full">
              <ControlledSelect
                onPress={() => {
                  navigation.navigate("Teams", {
                    categoryId: game.categoryId,
                    external: false,
                    mode: "select",
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
                    categoryId: game.categoryId,
                    external: true,
                    mode: "select",
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
                    categoryId: game.categoryId,
                  });
                }}
                label="Joueurs *"
                control={control}
                rules={{ required: "Au moins un joueur est obligatoire" }}
                name={PLAYERS}
                renderValue={(value: number[]) => (
                  <View
                    className={clsx(
                      value.length ? "bg-[#AB6C49]" : "bg-gray-400",
                      "rounded-lg",
                    )}
                  >
                    <StyledText cn={clsx("text-white px-1 overflow-hidden")}>
                      {value?.length?.toString() ?? "0"}
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
                defaultValue={DateTime.now().toJSDate().toISOString()}
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
                name="name"
              />
            </Card>
          </SectionContainer>
          <View className="mt-8 flex-1 justify-end items-center pb-8">
            <CustomButton
              variant="contained"
              strong
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-lg text-gray-200">Let&apos;s go</Text>
            </CustomButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

// @to-do: handle game between internal teams
export function EditGame({ navigation, route }: AppNavigationProp<"EditGame">) {
  const { gameId } = route.params;
  // const clubId = useClubIdContext();

  const { game, isLoading } = useGame(gameId);

  // const handleOnPress = async (data) => {
  //   teamMembersMutation.mutate({ date: DateTime.fromISO(data.date), duration: Number(data.duration), name: data.gameName ?? "" } as GameMutation);
  // };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit game",
      // eslint-disable-next-line react/no-unstable-nested-components
      // headerLeft: () => <GoHomeButton />,
    });
  }, [navigation]);

  // useGameStoreParamWatcher({
  //   control, name: PLAYERS, rules: { required: "Au moins un joueur est obligatoire" }, defaultValue: [], onChange: (value) => value.map(v => Number(v.id))
  // })
  // useGameStoreParamWatcher({ control, name: TEAM, rules: { required: "L'équipe est obligatoire" }, defaultValue: game?.TeamGame?.[0]?.teamId, onChange: (value) => value })
  // useGameStoreParamWatcher({
  //   control, name: OPPONENT_TEAM, rules: { required: "L'équipe adverse est obligatoire" }, defaultValue: game?.TeamGame?.[1]?.teamId, onChange: (value) => value
  // })

  if (isLoading) return null;

  return <Game game={game} />;
}
