import { useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native";
import { AppNavigationProp, AppRouteProp } from "../../navigators";
import { useInfiniteQuery } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';
import { graphql, DocumentType, useFragment } from "../../gql";
import { GameQueryQuery } from "../../gql/graphql";
import * as SplashScreen from "expo-splash-screen";
import { GoHomeButton } from "../../components/GoHomeButton";
import { Game, GameScreenTeamItemFragment } from "./Game";

SplashScreen.preventAutoHideAsync();


const gameQuery = graphql(/* GraphQL */ `
  query gameQuery($gameId: BigInt!, $after: Cursor) {
    gameCollection(filter: { id: { eq: $gameId } }) {
      edges {
        node {
          id
          date
          duration
          gameEnded
          name
          teamGameCollection(orderBy: [{id: DescNullsLast}]) {
            edges {
              node {
                ...GameScreenTeamItemFragment
              }
            }
          }
        }
      }
    }
  }
`)

const useRouteGameId = (route: AppRouteProp<"Game">) => {
  return route.params.gameId;
};

const useInfiniteGameQuery = (gameId) => {
  const { data, ...args } = useInfiniteQuery({
    queryKey: ["game", { gameId }],
    queryFn: async ({ pageParam = null }) => {
      const res = await request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        gameQuery,
        { gameId, after: pageParam },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      )
      return res
    },
    getNextPageParam: (lastPage, allPages) => {
      // @To do handle both teamGame shoots
      const teamGameA = useFragment(GameScreenTeamItemFragment, lastPage.gameCollection.edges[0].node.teamGameCollection.edges[0].node)
      const teamGameB = useFragment(GameScreenTeamItemFragment, lastPage.gameCollection.edges[0].node.teamGameCollection.edges[1].node)
      const hasNextPageA = teamGameA.shootsCollection.pageInfo.hasNextPage;
      if (hasNextPageA) {
        return teamGameA.shootsCollection.pageInfo.endCursor
      }
      const hasNextPageB = teamGameB.shootsCollection.pageInfo.hasNextPage;
      if (hasNextPageB) {
        return teamGameB.shootsCollection.pageInfo.endCursor
      }
    }
  })

  const mergedData = useMemo<GameQueryQuery>(() => {
    return data?.pages.reduce((prev, page) => {
      if (!prev) {
        return page
      }

      function mergeShoots(prev, index) {
        // gameCollection are ordered by id assuring the match 0 -> 0, 1 -> 1
        const teamGame = useFragment(GameScreenTeamItemFragment, prev.gameCollection.edges[0].node.teamGameCollection.edges[index].node);
        const pageTeam = useFragment(GameScreenTeamItemFragment, page.gameCollection.edges[0].node.teamGameCollection.edges[index].node);
        teamGame.shootsCollection.edges.push(...pageTeam.shootsCollection.edges)
        return teamGame
      }
      const teamGameA = mergeShoots(prev, 0)
      const teamGameB = mergeShoots(prev, 1)

      prev.gameCollection.edges[0].node.teamGameCollection.edges[0].node = teamGameA
      prev.gameCollection.edges[0].node.teamGameCollection.edges[1].node = teamGameB
      return prev
    }, null)
  }, [data]);

  return { data: mergedData, ...args }
}

const useTeams = (data?: GameQueryQuery) => {
  let teamGame: DocumentType<typeof GameScreenTeamItemFragment> | null = null
  let opponentTeamGame: DocumentType<typeof GameScreenTeamItemFragment> | null = null
  if (!data) {
    return { teamGame, opponentTeamGame }
  }
  const teams = data.gameCollection.edges[0].node.teamGameCollection.edges;
  const teamGame1 = useFragment(GameScreenTeamItemFragment, teams[0].node);
  const teamGame2 = useFragment(GameScreenTeamItemFragment, teams[1].node);
  teamGame = teamGame1.team.external ? teamGame2 : teamGame1;
  opponentTeamGame = teamGame1.team.external ? teamGame1 : teamGame2;

  return { teamGame, opponentTeamGame }
}

export function GameScreen({ navigation, route }: AppNavigationProp<"Game">) {
  const gameId = useRouteGameId(route);
  const { data, isFetching } = useInfiniteGameQuery(gameId);

  const { teamGame, opponentTeamGame } = useTeams(data);

  const game = data?.gameCollection.edges[0].node;
  const gameName = data?.gameCollection.edges[0].node.name;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: gameName || "Game",
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => <GoHomeButton />,
    });
  }, [navigation, gameName]);

  if (isFetching) { return null; }

  return (
    <SafeAreaView className="flex-1">
      <Game gameId={gameId} teamGame={teamGame} opponentTeamGame={opponentTeamGame} game={{ gameEnded: game.gameEnded, gameId: game.id, duration: game.duration }} />
    </SafeAreaView>
  );
}
