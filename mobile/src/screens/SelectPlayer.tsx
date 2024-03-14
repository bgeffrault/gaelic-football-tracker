import { ScrollView, View } from "react-native";
import { useEffect } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { StyledText } from "../components/StyledText";

import { CustomButton } from "../components/CustomButton";
import { useAppSelector } from "../stores/store";
import { AppNavigationProp } from "../navigators";
import { setPlayerId } from "../stores";
import { useSupabaseClientContext } from "../providers/useSupabaseClient";
import { MemberType } from "../domain/types";

function MemberItem({
  member,
  first,
  last,
  onPress,
}: {
  member: MemberType;
  first: boolean;
  last: boolean;
  onPress?: () => void;
}) {
  return (
    <View
      className={clsx(
        "flex-row justify-between items-center",
        "py-2 px-4",
        first && "rounded-t-lg",
        last && "rounded-b-lg",
      )}
    >
      <CustomButton cn="grow" onPress={onPress}>
        <StyledText cn="font-bold text-lg">
          {member.firstName} {member.lastName}
        </StyledText>
      </CustomButton>
    </View>
  );
}

export function SelectPlayer({
  navigation,
  route,
}: AppNavigationProp<"SelectPlayer">) {
  const teamGameId = route?.params?.teamGameId;
  const dispatch = useDispatch();
  const playerId = useAppSelector((state) => state.player.playerId);
  const supabaseClient = useSupabaseClientContext();

  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ["teamMember", teamGameId],
    queryFn: async () => {
      const result = await supabaseClient
        .from("TeamMembers")
        .select("*, member: Members(*)")
        .eq("teamGameId", teamGameId);
      return result.data;
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Shooter",
    });
  }, [navigation]);

  // Set null to playerId if no player is registered/selected
  useEffect(() => {
    return () => {
      if (playerId === undefined) {
        dispatch(setPlayerId(null));
      }
    };
  }, [playerId]);

  if (isLoading) return null;

  const players = teamMembers.map((teamMember) => teamMember.member);

  return (
    <View className="mt-3 bg-white rounded-xl">
      <ScrollView>
        {players.map((player, i, arr) => (
          <MemberItem
            key={player.id}
            first={i === 0}
            last={i === arr.length - 1}
            member={player}
            onPress={() => {
              dispatch(setPlayerId(player.id));
              navigation.goBack();
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}
