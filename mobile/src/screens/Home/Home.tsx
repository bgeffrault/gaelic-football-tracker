import { useEffect, useMemo, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CustomButton } from "../../components/CustomButton";
import { HeaderRightAddButton } from "../../components/Header/HeaderRightAddButton";
import { AppNavigationProp, useAppNavigation } from "../../navigators";
import { graphql } from "../../gql/gql";
import { useFragment } from "../../gql";
import Constants from 'expo-constants';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { useClubIdContext } from "../../providers/ClubIdProvider";
import { GameListFragment, GamesSection } from "./GameSection";
import { CategoryFilter } from "../../components/CategoryFilter";
import { StyledText } from "../../components/StyledText";
import { SectionContainer } from "../../components/SectionContainer";
import { SectionTitle } from "../../components/SectionTitle";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";
import { Database } from "../../domain/database.types";

const HomeFragment = graphql(/* GraphQL */ `
  fragment HomeFragment on Club {
    id
    name
  }
`);

const clubQuery = graphql(/* GraphQL */ `
  query clubQuery($clubId: BigInt!) {
    clubCollection(filter: { id: {eq: $clubId} }) {
      edges {
        node {
          id
          ...HomeFragment
        }
      }
    }
  }
`)

const NoGames = ({ title, cn }: { title: string, cn?: string }) => (
  <SectionContainer cn={cn} >
    <SectionTitle label={title} />
    <View className="flex items-center p-3" >
      <StyledText>No games yet</StyledText>
    </View>
  </SectionContainer>
)

const gamesQuery = graphql(/* GraphQL */ `
  query gamesQuery($clubId: BigInt!, $categoryId: BigInt!) {
    gameEndedCollection: gameCollection(filter: { gameEnded: { eq: true }, categoryId: { eq: $categoryId }, clubId: { eq: $clubId}  }, orderBy: [{date: DescNullsLast}]) {
      edges {
        ...GameListFragment
      }
    }
    gameInProgressCollection: gameCollection(filter: { gameEnded: { eq: false }, categoryId: { eq: $categoryId }, clubId: { eq: $clubId} }, orderBy: [{date: DescNullsLast}]) {
      edges {
        ...GameListFragment
      }
    }
  }
`)


const groupById = <T extends Database["public"]["Views"]["GameResult"]["Row"]>(data: T[]) => {
  const groupedData = data.reduce((acc, item) => {
    const id = item.id;
    const isExternal = item.external;
    const itemTeamGameId = item.teamGameId;
    const accTeamGameId = acc[id]?.teamGame?.[0].teamGameId;

    if ((!accTeamGameId && !isExternal) || (accTeamGameId && accTeamGameId === itemTeamGameId)) {
      acc[id] = {
        ...acc[id],
        teamGame: acc[id]?.teamGame ? [...acc[id]?.teamGame, item] : [item],
      }
    } else {
      acc[id] = {
        ...acc[id],
        opponentTeamGame: acc[id]?.opponentTeamGame ? [...acc[id]?.opponentTeamGame, item] : [item],
      }
    }

    return acc;
  }, {} as Record<number, {
    teamGame: T[],
    opponentTeamGame: T[],
  }>);

  return groupedData;
}

function filterObjectByMissingKey<T>(obj: Record<number, { teamGame: T; opponentTeamGame: T }>): Record<number, { teamGame: T; opponentTeamGame: T }> {
  const filteredObject: Record<number, { teamGame: T; opponentTeamGame: T }> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key].teamGame !== undefined && obj[key].opponentTeamGame !== undefined) {
      filteredObject[key] = obj[key];
    }
  }

  return filteredObject;
}

const useGamesResult = (categoryId: number) => {
  const supabaseClient = useSupabaseClientContext();
  const clubId = useClubIdContext();
  const { data, ...queryResults } = useQuery({
    queryKey: ["games", { categoryId, clubId }],
    queryFn: async () => {
      const result = await supabaseClient.from('GameResult').select('*').filter('categoryId', 'eq', categoryId).filter("clubId", 'eq', clubId)
      return result.data
    },
  })

  return {
    ...queryResults,
    gamesInProgress: filterObjectByMissingKey(groupById(data?.filter(game => !game.gameEnded) ?? [])),
    gamesEnded: filterObjectByMissingKey(groupById(data?.filter(game => game.gameEnded) ?? [])),
  }
}

export function Home({ }: AppNavigationProp<"Home">) {
  const [categoryId, setCategoryId] = useState(1)
  const queryClient = useQueryClient();

  const navigation = useAppNavigation();
  const clubId = useClubIdContext();

  const { data, isLoading } = useQuery({
    queryKey: ["club"],
    queryFn: async () =>
      request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        clubQuery,
        { clubId },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      ),
  })
  const club = useFragment(HomeFragment, data?.clubCollection.edges?.[0]?.node)

  const { gamesInProgress, gamesEnded, isLoading: isLoadingGames, refetch: refetchGames, isRefetching, remove } = useGamesResult(categoryId)
  const onRefresh = () => {
    // remove()
    // queryClient.invalidateQueries({ queryKey: ["games", { categoryId, clubId }] });
    refetchGames()
  }

  const clubName = useMemo(() => { if (club) return club.name; return "Home" }, [club])

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <HeaderRightAddButton nav="NewGame" />,
      headerTitle: clubName,
    });
  }, [navigation, clubName]);

  if (isLoading || isLoadingGames) {
    // @To do: add a loading indicator
    return null
  }

  return (
    <View className="flex-1">
      <CategoryFilter onPress={(id) => setCategoryId(id)} categoryId={categoryId} />
      <ScrollView className="py-1 grow flex-1"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      >
        {Object.keys(gamesInProgress).length > 0 ? (
          <View className="mb-3">
            <GamesSection games={gamesInProgress} title="In progress" />
          </View>
        ) : <NoGames title="In progress" cn="mb-3" />}
        {Object.keys(gamesEnded).length > 0 ? (
          <View className="">
            <GamesSection games={gamesEnded} title="Last Games" />
          </View>
        ) : <NoGames title="Last Games" />}
      </ScrollView>
      <View className="flex-row justify-around items-center pb-8 pt-2">
        <CustomButton onPress={() => navigation.navigate("Members")}>
          <FontAwesome name="users" size={24} color="#6B7280" />
        </CustomButton>
        <CustomButton onPress={() => navigation.navigate("ClubConfig")}>
          <FontAwesome name="cog" size={24} color="#6B7280" />
        </CustomButton>
      </View>
    </View>
  );
}

