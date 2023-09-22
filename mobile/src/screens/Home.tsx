import clsx from "clsx";
import { useEffect, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import { StyledText } from "../components/StyledText";
import { HeaderRightAddButton } from "../components/Header/HeaderRightAddButton";
import { sumScore } from "../utils/sumScore";
import { gameResult, gameResultColors, shootsAccuracy, sumShoots } from "../utils/shootsUtils";
import { useAppSelector } from "../stores/store";
import { AppNavigationProp, useAppNavigation } from "../navigators";
import { Game, Score } from "../domain/types";
import { DocumentType, graphql } from "../gql/gql";
import { useGraphQLQuery } from "../useGraphQLQuery";
import { useFragment } from "../gql";

const HomeFragment = graphql(/* GraphQL */ `
  fragment HomeFragment on Club {
    id
    name
  }
`)

const TeamScoreFragment = graphql(/* GraphQL */ `
  fragment TeamScoreFragment on TeamGame {
    id
    team {
      teamName
    }

    shootsCollection {
      edges {
        node {
          id
          type
        }
      }
    }
  }
`)

const GameFragment = graphql(/* GraphQL */ `
  fragment GameFragment on Game {
    id
    duration
    gameEnded

    teamGameCollection {
      edges {
        node {
          ...TeamScoreFragment

          shootsCollection {
            edges {
              node {
                id
                type
              }
            }
          }
        }
      }
    }
  }
`)

const GameListFragment = graphql(/* GraphQL */ `
  fragment GameListFragment on GameEdge {
    node {
      id,
      ...GameFragment
    }
  }
`)


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
  const { gameList } = useAppSelector((state) => state.games);
  const { data } = useGraphQLQuery(["club-gameEnded-gameInProgress"], clubQuery, { id: 1 })
  const club = useFragment(HomeFragment, data?.clubCollection.edges?.[0]?.node)
  const gamesEnded = useFragment(GameListFragment, data?.gameEndedCollection.edges) ?? []
  const gamesInProgress = useFragment(GameListFragment, data?.gameInProgressCollection.edges) ?? []

  const clubName = useMemo(() => { if (club) return club.name; return "Home" }, [club])

  // console.log('data', JSON.stringify(data, null, 2));
  console.log('gamesInProgress', JSON.stringify(gamesInProgress, null, 2));


  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <HeaderRightAddButton nav="NewGame" />,
      headerTitle: clubName,
    });
  }, [navigation, clubName]);

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
      <View className="h-24 justify-center items-center border border-x-0 border-b-0">
        <CustomButton onPress={() => navigation.navigate("Members")}>
          <FontAwesome name="users" size={42} color="black" />
        </CustomButton>
      </View>
    </>
  );
}

function GamesSection({ games, title }: {
  games: readonly DocumentType<typeof GameListFragment>[];
  title: string;
}) {
  return (
    <View className="">
      <StyledText cn="tracking-wide bg-[#df8c5f] p-1">{title}</StyledText>
      <ScrollView className="mt-2">
        {games.map(({ node }, i, arr) => {
          const game = useFragment(GameFragment, node)

          return (
            <GameListItem
              key={game.id}
              game={game}
              first={i === 0}
              last={i === arr.length - 1}
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

function GameListItem({ game, first, last }: {
  game: DocumentType<typeof GameFragment>;
  first: boolean;
  last: boolean;
}) {
  const { teamA, teamB, teamAAccuracy, result } = useMemo(() => {
    console.log('game', game);
    const teamA = game?.teamGameCollection.edges?.[0]?.node;
    const teamB = game?.teamGameCollection.edges?.[1]?.node;

    const teamAShoots = teamA?.shootsCollection.edges.map((e) => e.node);
    const teamBShoots = teamB?.shootsCollection.edges.map((e) => e.node);

    const teamAAccuracy = teamAShoots ? shootsAccuracy(teamAShoots) : 0;
    const result = teamAShoots && teamBShoots ? gameResult(teamAShoots, teamBShoots) : undefined;
    return { teamA, teamB, teamAAccuracy, result }
  }, [game]);

  const navigation = useAppNavigation();
  const handleOnPress = () => {
    navigation.navigate("Game", { gameId: game.id });
  };

  return (
    <Card
      cn={clsx(
        gameResultColors[result],
        "border border-[#00000066]",
        "py-1 px-4"
      )}
      first={first}
      last={last}
      isListItem
    >
      <View className="flex-row justify-between">
        {teamA && <TeamScore teamGame={teamA as DocumentType<typeof TeamScoreFragment>} />}
        <View className="items-center">
          <StyledText>{game.duration}&apos;</StyledText>
          {game.gameEnded ? (
            <StyledText>-</StyledText>
          ) : (
            <CustomButton onPress={handleOnPress}>
              <AntDesign name="playcircleo" size={24} color="black" />
            </CustomButton>
          )}
        </View>
        {teamB && <TeamScore
          teamGame={teamB as DocumentType<typeof TeamScoreFragment>}
        />}
      </View>
      <StyledText cn="mt-1 text-xs text-gray-800">
        Accuracy: {teamAAccuracy}%
      </StyledText>
    </Card>
  );
}

function TeamScore({ teamGame }: {
  teamGame: DocumentType<typeof TeamScoreFragment>;
}) {
  const { points, goals, score } = useMemo(() => {
    const points = teamGame.shootsCollection.edges.filter((e) => e.node.type === "drop");
    const goals = teamGame.shootsCollection.edges.filter((e) => e.node.type === "goal");
    const score = sumShoots([...points.map(p => p.node), ...goals.map(p => p.node)]);
    return { points, goals, score }
  }, [])
  return (
    <View className="items-center">
      <StyledText cn="text-lg ">{teamGame.team.teamName}</StyledText>
      <StyledText cn="text-lg">
        {points.length} - {goals.length} ({score})
      </StyledText>
    </View>
  );
}
