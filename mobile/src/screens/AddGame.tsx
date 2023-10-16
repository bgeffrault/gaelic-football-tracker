import { Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import { useAppSelector } from "../stores/store";
import { useClubIdContext } from "../providers/ClubIdProvider";
import { Control, FieldValues, useController, useForm } from "react-hook-form";
import { ControlledLabelledTextInput, ControlledSelect, Rules } from "../components/ControlledComponents";
import { StyledText } from "../components/StyledText";
import { resetGame, resetPlayers } from "../stores";
import { CategoryFilter } from "../components/CategoryFilter";
import clsx from "clsx";
import { graphql } from "../gql";
import { Game } from "../gql/graphql";
import request from "graphql-request";
import Constants from 'expo-constants';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionContainer } from "../components/SectionContainer";
import { GoHomeButton } from "../components/GoHomeButton";
import { AppNavigationProp } from "../navigators";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

const AddTeamMembersMutation = graphql(/* GraphQL */ `
mutation AddTeamMembersMutation($teamMembers: [TeamMembersInsertInput!]!) {
  insertIntoTeamMembersCollection(objects: $teamMembers) {
    records {
      id
    }
  }
}
`);

const AddTeamGameMutation = graphql(/* GraphQL */ `
  mutation AddTeamGameMutation($teamId: Int!, $gameId: BigInt!, $teamId2: Int!) {
    insertIntoTeamGameCollection(objects: [
      {
        teamId: $teamId, 
        gameId: $gameId, 
      },
      {
        teamId: $teamId2, 
        gameId: $gameId, 
      },
    ]) {
      records {
        id
        teamId
      }
    }
  }
`);


const AddGameMutation = graphql(/* GraphQL */ `
  mutation AddGameMutation($date: Datetime!, $duration: Int!, $name: String, $clubId: BigInt!) {
    insertIntoGameCollection(objects: {
      date: $date, 
      duration: $duration, 
      name: $name, 
      gameEnded: false, 
      clubId: $clubId,
    }) {
      records {
        id
      }
    }
  }
`);

type GameMutation = Pick<Game, "date" | "duration" | "name">;

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

  const teamMembersMutation = useMutation({
    mutationFn: async (teamMembers: { teamGameId: number, memberId: number }[]) => {
      return request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        AddTeamMembersMutation,
        { teamMembers },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      navigation.navigate("Game", { gameId: gameIdRef.current, isOpponentTeamSelected: false });
    },
  })

  const teamGameMutation = useMutation({
    mutationFn: async ({ teamId, gameId, teamId2 }: { teamId: number, gameId: number, teamId2: number }) => {
      return request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        AddTeamGameMutation,
        { teamId, gameId, teamId2 },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      )
    },
    onSuccess: (data) => {
      const formValues = getValues();
      const teamGame = data.insertIntoTeamGameCollection.records[0]
      const teamGameId = Number(teamGame?.id)
      const teamMembers = formValues.players().map(playerId => ({ memberId: playerId, teamGameId }))
      teamMembersMutation.mutate(teamMembers)
    },
  })

  const gameMutation = useMutation({
    mutationFn: async ({ date, duration, name }: GameMutation) =>
      request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        AddGameMutation,
        { date, duration, name, clubId },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      ),
    onSuccess: (data) => {
      const formValues = getValues();
      const gameId = Number(data.insertIntoGameCollection.records[0].id);
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
