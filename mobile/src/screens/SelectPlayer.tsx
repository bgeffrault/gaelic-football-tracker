import { ScrollView, View } from "react-native";
import { useEffect } from "react";
import clsx from "clsx";
import { StyledText } from "../components/StyledText";
import { useDispatch } from "react-redux";

import { CustomButton } from "../components/CustomButton";
import { useAppSelector } from "../stores/store";
import { AppNavigationProp } from "../navigators";
import { graphql, useFragment } from "../gql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';
import { SelectPlayerItemQueryFragment } from "../gql/graphql";
import { setPlayerId } from "../stores";

const SelectPlayerItemQuery = graphql(/* GraphQL */ `
  fragment SelectPlayerItemQuery on Members {
    id
    firstName
    lastName
    pseudo
  }
`)

const selectPlayerQuery = graphql(/* GraphQL */ `
  query selectPlayerQuery($teamGameId: BigInt) {
    teamMembersCollection(filter: { teamGameId: { eq: $teamGameId } }) {
      edges {
        node {
          id
          member {
            ...SelectPlayerItemQuery
          }
        }
      }
    }
  }
`)


export function SelectPlayer({ navigation, route }: AppNavigationProp<"SelectPlayer">) {
  const teamGameId = route?.params?.teamGameId;
  const dispatch = useDispatch();
  const playerId = useAppSelector((state) => state.player.playerId);

  const { data, isLoading } = useQuery({
    queryKey: ["teamMember", teamGameId],
    queryFn: async () =>
      request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        selectPlayerQuery,
        { teamGameId },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      ),
  })

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Shooter",
    });
  }, [navigation]);

  // Set null to playerId if no player is registered/selected
  useEffect(() => {
    return () => {
      if (playerId === undefined) {
        dispatch(setPlayerId(null))
      }
    }
  }, [playerId])

  if (isLoading) return null;

  const players = data.teamMembersCollection.edges.map((edge) => useFragment(SelectPlayerItemQuery, edge.node.member)) ?? [];

  return (
    <View className="mt-3 bg-white rounded-xl">
      <ScrollView>
        {players.map((member, i, arr) => (
          <MemberItem
            key={member.id}
            first={i === 0}
            last={i === arr.length - 1}
            member={member}
            onPress={() => {
              dispatch(setPlayerId(member.id));
              navigation.goBack();
            }}
          />
        ))}
      </ScrollView>

    </View>
  );
}

function MemberItem({ member, first, last, onPress }: {
  member: SelectPlayerItemQueryFragment;
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
        last && "rounded-b-lg"
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
