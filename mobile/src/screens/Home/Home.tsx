import { useEffect, useMemo, useRef, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
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
import { Game, GameContent, GameResult, GameResultByTeam, GamesSection } from "./GameSection";
import { CategoryFilter } from "../../components/CategoryFilter";
import { StyledText } from "../../components/StyledText";
import { SectionContainer } from "../../components/SectionContainer";
import { SectionTitle } from "../../components/SectionTitle";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";
import { useIsFocused } from "@react-navigation/native";

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

const groupById = (data?: Game[]): GameContent => {
  if (!data) return [];
  const groupedData = data.reduce((acc, item) => {
    const id = item.id;
    const gameResults = item.GameResult;
    const internalTeamGame = item.TeamGame?.[0]?.Team.external ? item.TeamGame[1] : item.TeamGame[0];

    if (item.TeamGame?.length != 2) return acc;

    const externalTeamGame = item.TeamGame?.[0]?.Team.external ? item.TeamGame[0] : item.TeamGame[1];
    const internalTeamGameId = internalTeamGame.id;

    if (!gameResults?.length) {
      acc.push({
        teamGame: {
          gameResults: gameResults.filter(gameResult => gameResult.teamGameId === internalTeamGameId) ?? [],
          teamName: internalTeamGame.Team.teamName,
          external: internalTeamGame.Team.external,
          categoryId: internalTeamGame.Team.categoryId,
        },
        opponentTeamGame: {
          gameResults: gameResults.filter(gameResult => gameResult.teamGameId !== internalTeamGameId) ?? [],
          teamName: externalTeamGame.Team.teamName,
          external: externalTeamGame.Team.external,
          categoryId: externalTeamGame.Team.categoryId,
        },
        id: item.id,
        gameEnded: item.gameEnded,
        name: item.name,
        duration: item.duration,
        date: item.date,
      })
      return acc;
    }

    acc.push({
      teamGame: {
        gameResults: gameResults.filter(gameResult => gameResult.teamGameId === internalTeamGameId) ?? [],
        teamName: internalTeamGame.Team.teamName,
        external: internalTeamGame.Team.external,
        categoryId: internalTeamGame.Team.categoryId,
      },
      opponentTeamGame: {
        gameResults: gameResults.filter(gameResult => gameResult.teamGameId !== internalTeamGameId) ?? [],
        teamName: externalTeamGame.Team.teamName,
        external: externalTeamGame.Team.external,
        categoryId: externalTeamGame.Team.categoryId,
      },
      id: item.id,
      gameEnded: item.gameEnded,
      name: item.name,
      duration: item.duration,
      date: item.date,
    })

    return acc;
  }, [] as GameContent);

  return groupedData;
}


const useGamesResult = (categoryId: number) => {
  const supabaseClient = useSupabaseClientContext();
  const clubId = useClubIdContext();
  const { data, ...queryResults } = useQuery({
    queryKey: ["games", { categoryId, clubId }],
    queryFn: async () => {
      const result = await supabaseClient
        .from('Game')
        .select('id, gameEnded, name, duration, date, TeamGame(id, Team(teamName, external, categoryId))') // @To-improve: improve view by removing unnecessary fields
        .filter('categoryId', 'eq', categoryId)
        .filter("clubId", 'eq', clubId)
        .order('date', { ascending: false })

      const games = result.data
      const gamesId = games.map(game => game.id)

      const resultGameResults = await supabaseClient
        .from('GameResult')
        .select('*')
        .in("id", gamesId)

      const finalResult: Game[] = games.map((game) => {
        const gameResults = resultGameResults.data.filter(gameResult => gameResult.id === game.id)
        return { ...game, GameResult: gameResults as GameResult[] }
      })

      return finalResult
    },
  })

  return {
    ...queryResults,
    gamesInProgress: groupById(data?.filter(game => !game.gameEnded)) ?? [],
    gamesEnded: groupById(data?.filter(game => game.gameEnded)) ?? [],
  }
}

const useRefetchOnScreenFocused = (refetch: ReturnType<typeof useQuery>["refetch"]) => {
  const isFocused = useIsFocused();
  const firstRenderRef = useRef(true)
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    if (isFocused) {
      refetch()
    }
  }, [isFocused])
}

// @To-do: It does not work with games without shoots
export function Home({ }: AppNavigationProp<"Home">) {
  const [categoryId, setCategoryId] = useState(1)

  const navigation = useAppNavigation();
  const clubId = useClubIdContext();

  const { data, isLoading } = useQuery({
    queryKey: ["club", { clubId }],
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

  const { gamesInProgress, gamesEnded, isLoading: isLoadingGames, refetch: refetchGames, isRefetching } = useGamesResult(categoryId)

  const onRefresh = () => {
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

  useRefetchOnScreenFocused(refetchGames)

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

