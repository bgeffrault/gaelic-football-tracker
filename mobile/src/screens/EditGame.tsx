import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import {
  ControlledLabelledTextInput,
  ControlledSelect,
} from "../components/ControlledComponents";
import { StyledText } from "../components/StyledText";
import { setPlayers } from "../stores";
import { SectionContainer } from "../components/SectionContainer";
import { AppNavigationProp, useAppNavigation } from "../navigators";
import { useSupabaseClientContext } from "../providers/useSupabaseClient";
import { Team } from "../types/Team";
import { MemberType } from "../domain/types";

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
        .select("*, TeamGame(*, Team(teamName), TeamMembers(Members(*)))")
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
  duration: string;
  gameName: string;
  [TEAM]: { teamName: string };
  [OPPONENT_TEAM]: { teamName: string };
  [PLAYERS]: number[];
};

function Game({ game }: { game: GameType }) {
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const { control, handleSubmit, getValues } = useForm<Input>({
    values: {
      date: game.date,
      duration: game.duration.toString(),
      gameName: game.name,
      [TEAM]: game.TeamGame[0].Team, // @To do: adjust with external team
      [OPPONENT_TEAM]: game.TeamGame[1].Team,
      [PLAYERS]: game.TeamGame[0].Members.map((m) => m.id), // @To do: adjust with external team
    },
  });

  const renderTeam = (value: Team) => (
    <StyledText cn="text-gray-400">
      {value ? value.teamName : "Equipe A"}
    </StyledText>
  );

  return (
    <View className="flex-1">
      <KeyboardAwareScrollView>
        <SectionContainer cn="mt-3">
          <KeyboardAwareScrollView className="">
            <Card cn="w-full">
              <ControlledSelect
                onPress={() => {}}
                label="Equipe *"
                control={control}
                rules={{ required: "L'équipe est obligatoire" }}
                name={TEAM}
                renderValue={renderTeam}
                disabled
              />
              <ControlledSelect
                onPress={() => {}}
                label="Equipe adverse *"
                control={control}
                rules={{ required: "L'équipe adverse est obligatoire" }}
                name={OPPONENT_TEAM}
                renderValue={renderTeam}
                disabled
              />
              <ControlledSelect
                onPress={() => {
                  dispatch(
                    setPlayers(
                      game.TeamGame[0].Members.filter((m) =>
                        getValues()[PLAYERS].includes(m.id),
                      ),
                    ),
                  );
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
                defaultValue="60"
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
          </KeyboardAwareScrollView>
        </SectionContainer>
      </KeyboardAwareScrollView>
      <View className="mt-8 flex-1 justify-end items-center pb-8">
        <CustomButton
          variant="contained"
          strong
          onPress={handleSubmit(() => {})}
        >
          <Text className="text-lg text-gray-200">Let&apos;s go</Text>
        </CustomButton>
      </View>
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
