import { Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import { useAppSelector } from "../stores/store";
import { useClubIdContext } from "../providers/ClubIdProvider";
import { Control, FieldValues, useController, useForm } from "react-hook-form";
import { ControlledLabelledTextInput, ControlledSelect, Rules } from "../components/ControlledComponents";
import { StyledText } from "../components/StyledText";
import { resetGame } from "../stores";
import { CategoryFilter } from "../components/CategoryFilter";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionContainer } from "../components/SectionContainer";
import { GoHomeButton } from "../components/GoHomeButton";
import { AppNavigationProp } from "../navigators";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSupabaseClientContext } from "../providers/useSupabaseClient";
import { Game } from "./Home/GameSection";

const useGameStoreParamWatcher = <T extends unknown>({ control, name, rules, defaultValue, onChange }: {
  control: Control<FieldValues, T>,
  name: string,
  rules: Rules,
  defaultValue?: T,
  onChange: (value: T) => any
}) => {
  const storeValue = useAppSelector((state) => state.game[name]);
  const { field } = useController({
    control,
    defaultValue,
    name,
    rules
  })

  useEffect(() => {
    field.onChange(() => {
      return onChange(storeValue)
    });
  }, [storeValue]);
}

const TEAM = "team";
const OPPONENT_TEAM = "opponentTeam";
const PLAYERS = "players";



type GameMutation = {
  date: DateTime;
  duration: number;
  name: string;
};

type Input = {
  date: string;
  duration?: string;
  gameName?: string;
  [TEAM]: { teamName: string };
  [OPPONENT_TEAM]: { teamName: string };
  [PLAYERS]: number[];
}

// @To-do: handle game between internal teams
export function AddGame({ navigation }: AppNavigationProp<"AddGame">) {
  const [categoryId, setCategoryId] = useState(1)
  const clubId = useClubIdContext();
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset, getValues } = useForm()
  const gameIdRef = useRef<number>()
  const supabaseClient = useSupabaseClientContext();


  const teamMembersMutation = useMutation({
    mutationFn: async (teamMembers: { teamGameId: number, memberId: number }[]) => {
      const result = await supabaseClient.from('TeamMembers').insert(teamMembers)
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      navigation.navigate("Game", { gameId: gameIdRef.current, isOpponentTeamSelected: false });
    },
  })

  const teamGameMutation = useMutation({
    mutationFn: async ({ teamId, gameId, teamId2 }: { teamId: number, gameId: number, teamId2: number }) => {
      const result = await supabaseClient.from('TeamGame').insert([{
        teamId,
        gameId,
      },
      {
        teamId: teamId2,
        gameId,
      }]).select('id, teamId')
      return result.data
    },
    onSuccess: (data) => {
      const formValues = getValues();
      const teamGame = data[0]
      const teamGameId = Number(teamGame?.id)
      const teamMembers = formValues.players().map(playerId => ({ memberId: playerId, teamGameId }))
      teamMembersMutation.mutate(teamMembers)
    },
  })

  const gameMutation = useMutation({
    mutationFn: async ({ date, duration, name }: GameMutation) => {
      const result = await supabaseClient.from('Game').insert({
        date,
        duration,
        name,
        gameEnded: false,
        clubId,
      }).select('id')
      return result.data
    },
    onSuccess: (data) => {
      const formValues = getValues();
      const gameId = Number(data[0].id);
      gameIdRef.current = gameId
      teamGameMutation.mutate({ teamId: Number(formValues.team().id), gameId, teamId2: Number(formValues.opponentTeam().id) });
    },
  })

  const mutationsLoading = teamGameMutation.isLoading || gameMutation.isLoading || teamMembersMutation.isLoading

  const dispatch = useDispatch();

  const handleOnPress = async (data) => {
    gameMutation.mutate({ date: DateTime.fromISO(data.date), duration: Number(data.duration), name: data.gameName ?? "" } as GameMutation);
  };

  const onCategoryChange = (newCategoryId) => {
    dispatch(resetGame())
    reset({
      team: null,
      opponentTeam: null,
      players: [],
    })
    setCategoryId(newCategoryId)
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "New game",
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => <GoHomeButton />,
    });
  }, [navigation]);

  useGameStoreParamWatcher({
    control, name: PLAYERS, rules: { required: "Au moins un joueur est obligatoire" }, defaultValue: [], onChange: (value) => value.map(v => Number(v.id))
  })
  useGameStoreParamWatcher({ control, name: TEAM, rules: { required: "L'équipe est obligatoire" }, defaultValue: null, onChange: (value) => value })
  useGameStoreParamWatcher({
    control, name: OPPONENT_TEAM, rules: { required: "L'équipe adverse est obligatoire" }, defaultValue: null, onChange: (value) => value
  })

  useEffect(() => {
    return () => {
      dispatch(resetGame())
    }
  }, [])


  const renderTeam = (value) => <StyledText cn={clsx(value ? "text-gray-600" : "text-gray-300")}>{value ? value.teamName : "Equipe A"}</StyledText>

  return (
    <>
      <CategoryFilter onPress={onCategoryChange} categoryId={categoryId} />
      <KeyboardAwareScrollView>
        <SectionContainer>
          <KeyboardAwareScrollView className="">
            <Card cn="w-full">
              <ControlledSelect
                onPress={() => {
                  navigation.navigate("Teams", { mode: "select", categoryId, external: false });
                }}
                label="Equipe *"
                control={control}
                rules={{ required: "L'équipe est obligatoire" }}
                name={TEAM}
                renderValue={renderTeam}
              />
              <ControlledSelect
                onPress={() => {
                  navigation.navigate("Teams", { mode: "select", categoryId, external: true });
                }}
                label="Equipe adverse *"
                control={control}
                rules={{ required: "L'équipe adverse est obligatoire" }}
                name={OPPONENT_TEAM}
                renderValue={renderTeam}
              />
              <ControlledSelect
                onPress={() => {
                  navigation.navigate("SelectMembers", { mode: "select", categoryId });
                }}
                label="Joueurs *"
                control={control}
                rules={{ required: "Au moins un joueur est obligatoire" }}
                name={PLAYERS}
                renderValue={(value: number[]) => <View className={clsx(
                  value.length ? "bg-[#AB6C49]" : "bg-gray-400",
                  "rounded-lg"
                )}>
                  <StyledText
                    cn={clsx("text-white px-1 overflow-hidden")}
                  >
                    {value?.length?.toString() ?? '0'}
                  </StyledText>
                </View>
                }
              />
              <ControlledSelect
                label="Date *"
                dateType
                control={control}
                rules={{ required: "La date est obligatoire" }}
                name="date"
                defaultValue={DateTime.now().toJSDate().toISOString()}
                renderValue={(value) => <StyledText
                >
                  {DateTime.fromISO(value).toFormat("dd-MM-yyyy")}
                </StyledText>}
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
          onPress={handleSubmit(handleOnPress)}
          strong
        >
          <Text className="text-white text-lg">Let&apos;s go</Text>
        </CustomButton>
      </View>
    </>
  );
}
