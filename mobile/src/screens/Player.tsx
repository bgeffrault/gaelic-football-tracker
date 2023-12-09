import { View } from "react-native";
import { useEffect, useState } from "react";
import { StyledText } from "../components/StyledText";
import { AppNavigationProp } from "../navigators";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClientContext } from "../providers/useSupabaseClient";

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

      setPlayerShoots(data as PlayerShoots[])
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
  const supabaseClient = useSupabaseClientContext();

  const { data: player, isLoading } = useQuery({
    queryKey: ["player", { playerId }],
    queryFn: async () => {
      const result = await supabaseClient.from('Members').select('id, firstName, lastName, pseudo, license').eq('id', playerId).single()
      return result.data
    },
  })

  const { pointCount, goalCount, blockedCount, missedCount, playerShoots } = usePlayerShoots(playerId)
  const accuracy = (((goalCount + pointCount) / (goalCount + missedCount + pointCount + blockedCount)) * 100)
  const accuracyString = isNaN(accuracy) ? "" : accuracy.toFixed(2)

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
