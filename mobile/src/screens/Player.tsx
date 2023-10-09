import { SafeAreaView, ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import clsx from "clsx";
import { StyledText } from "../components/StyledText";
import { useDispatch } from "react-redux";

import { CustomButton } from "../components/CustomButton";
import { useAppSelector } from "../stores/store";
import { AppNavigationProp, useAppNavigation } from "../navigators";
import { graphql, useFragment } from "../gql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';
import { SelectPlayerItemQueryFragment } from "../gql/graphql";
import { set } from "react-hook-form";
import { setPlayerId } from "../stores";
import { useSupabaseClientContext } from "../providers/useSupabaseClient";
import { memberDataFixture } from "../fixtures/gameScreenFixtures";

const SelectPlayerItemQuery = graphql(/* GraphQL */ `
  fragment SelectPlayerItemQuery on Members {
    id
    firstName
    lastName
    pseudo
  }
`)

const playerQuery = graphql(/* GraphQL */ `
  query playerQuery($playerId: BigInt) {
    membersCollection(filter: { id: { eq: $playerId } }) {
      edges {
        node {
          id
          firstName
          lastName
          pseudo
          license
        }
      }
    }
  }
`)

export type PlayerShoots = {
  type: "point" | "goal" | "missed" | "blocked";
  count: number;
}

const usePlayerShoots = (playerId: number) => {
  const [playerShoots, setPlayerShoots] = useState<PlayerShoots[]>(null)
  const supabaseClient = useSupabaseClientContext();

  useEffect(() => {
    const fetchPlayer = async (): Promise<void> => {
      const { data, error } = await supabaseClient.from('PlayerScore').select('*').filter('memberId', 'eq', playerId)

      setPlayerShoots(data)
    }
    fetchPlayer()
  }, [playerId, supabaseClient])

  return {
    pointCount: playerShoots?.filter((shoot) => shoot.type === "point")?.[0]?.count,
    goalCount: playerShoots?.filter((shoot) => shoot.type === "goal")?.[0]?.count,
    missedCount: playerShoots?.filter((shoot) => shoot.type === "missed")?.[0]?.count,
    blockedCount: playerShoots?.filter((shoot) => shoot.type === "blocked")?.[0]?.count,
    playerShoots
  }
}

export function Player({ navigation, route }: AppNavigationProp<"Player">) {
  const playerId = route?.params?.playerId;
  const { data, isLoading } = useQuery({
    queryKey: ["player", { playerId }],
    queryFn: async () =>
      request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        playerQuery,
        { playerId },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      ),
  })

  const { pointCount, goalCount, blockedCount, missedCount, playerShoots } = usePlayerShoots(playerId)
  const accuracy = (((goalCount + pointCount) / (goalCount + missedCount + pointCount + blockedCount)) * 100)
  const accuracyString = isNaN(accuracy) ? "" : accuracy.toFixed(2)
  const player = data?.membersCollection.edges?.[0]?.node;

  useEffect(() => {
    if (player) {
      navigation.setOptions({
        headerTitle: `${player.firstName} ${player.lastName}`,
      });
    }
  }, [navigation, player]);

  if (isLoading) return null;

  return (
    <View className="flex-1">
      <View className="my-3 bg-white rounded-xl p-2" >
        <View className="flex-row justify-around pt-2">
          <View className="grow flex-1 items-start p-2" >
            <StyledText cn="text-gray-500" >License</StyledText>
          </View>
          <View className="grow flex-1 items-start p-2" >
            <StyledText cn="text-gray-500" >{player.license || "-"}</StyledText>
          </View>
        </View>
        {playerShoots?.length ? playerShoots.map((shoot) => (
          <View className="flex-row justify-around">
            <View className="grow flex-1 items-start p-2" >
              <StyledText cn="text-gray-500" >{shoot.type}</StyledText>
            </View>
            <View className="grow flex-1 items-start p-2" >
              <StyledText>{shoot.count}</StyledText>
            </View>
          </View>
        )) : (
          <View className="flex-row justify-around">
            <View className="grow flex-1 items-start p-2" >
              <StyledText cn="text-gray-500" >No shoots</StyledText>
            </View>
            <View className="grow flex-1 items-start p-2" >
              <StyledText>-</StyledText>
            </View>
          </View>
        )}
        <View className="flex-row justify-around pt-2">
          <View className="grow flex-1 items-start p-2" >
            <StyledText cn="text-gray-500" >Accuracy</StyledText>
          </View>
          <View className="grow flex-1 items-start p-2" >
            <StyledText cn="text-gray-500" >{accuracyString || "-"} %</StyledText>
          </View>
        </View>
      </View>
    </View>
  );
}
