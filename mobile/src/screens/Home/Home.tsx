import { useEffect, useMemo } from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CustomButton } from "../../components/CustomButton";
import { HeaderRightAddButton } from "../../components/Header/HeaderRightAddButton";
import { AppNavigationProp, useAppNavigation } from "../../navigators";
import { graphql } from "../../gql/gql";
import { useFragment } from "../../gql";
import Constants from 'expo-constants';
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useClubIdContext } from "../../providers/ClubIdProvider";
import { GameListFragment, GamesSection } from "./GameSection";

const HomeFragment = graphql(/* GraphQL */ `
  fragment HomeFragment on Club {
    id
    name
  }
`);

const clubQuery = graphql(/* GraphQL */ `
  query clubQuery($id: BigInt!) {
    clubCollection(filter: { id: {eq: $id} }) {
      edges {
        node {
          id
          ...HomeFragment
        }
      }
    }
    gameEndedCollection: gameCollection(filter: { gameEnded: { eq: true } }) {
      edges {
        ...GameListFragment
      }
    }
    gameInProgressCollection: gameCollection(filter: { gameEnded: { eq: false } }) {
      edges {
        ...GameListFragment
      }
    }
  }
`)

export function Home({ }: AppNavigationProp<"Home">) {
  const navigation = useAppNavigation();
  const clubId = useClubIdContext();

  const { data, isLoading } = useQuery({
    queryKey: ["club-gameEnded-gameInProgress"],
    queryFn: async () =>
      request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        clubQuery,
        { id: clubId },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      ),
  })

  const club = useFragment(HomeFragment, data?.clubCollection.edges?.[0]?.node)
  const gamesEnded = useFragment(GameListFragment, data?.gameEndedCollection.edges) ?? []
  const gamesInProgress = useFragment(GameListFragment, data?.gameInProgressCollection.edges) ?? []

  const clubName = useMemo(() => { if (club) return club.name; return "Home" }, [club])

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <HeaderRightAddButton nav="NewGame" />,
      headerTitle: clubName,
    });
  }, [navigation, clubName]);

  if (isLoading) {
    // @To do: add a loading indicator
    return null
  }

  return (
    <>
      <View className="p-6 flex-1">
        {gamesInProgress.length > 0 && (
          <View className="mb-4">
            <GamesSection games={gamesInProgress} title="In progress" />
          </View>
        )}
        {gamesEnded.length > 0 && (
          <View className="flex-1">
            <GamesSection games={gamesEnded} title="Last Games" />
          </View>
        )}
      </View>
      <View className="h-24 flex-row justify-around items-center border border-x-0 border-b-0">
        <CustomButton onPress={() => navigation.navigate("Members")}>
          <FontAwesome name="users" size={42} color="black" />
        </CustomButton>
        <CustomButton onPress={() => navigation.navigate("ClubConfig")}>
          <FontAwesome name="cog" size={42} color="black" />
        </CustomButton>
      </View>
    </>
  );
}

