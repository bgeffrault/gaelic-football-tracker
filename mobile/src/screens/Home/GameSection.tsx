import clsx from "clsx";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { CustomButton } from "../../components/CustomButton";
import { StyledText } from "../../components/StyledText";
import { gameResult, gameResultColors, gameResultGradientColors, shootsAccuracy, sumShoots } from "../../utils/shootsUtils";
import { useAppNavigation } from "../../navigators";
import { DocumentType, graphql } from "../../gql/gql";
import { useFragment } from "../../gql";
import { SectionTitle } from "../../components/SectionTitle";
import { getCategoryName } from "../../utils/getCategoryName";
import { LinearGradient } from 'expo-linear-gradient';
import { SectionContainer } from "../../components/SectionContainer";

export const TeamScoreFragment = graphql(/* GraphQL */ `
  fragment TeamScoreFragment on TeamGame {
    id
    team {
      teamName
      category {
        id
        name
      }
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

export const GameFragment = graphql(/* GraphQL */ `
  fragment GameFragment on Game {
    id
    duration
    gameEnded
    name
    date

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

export const GameListFragment = graphql(/* GraphQL */ `
  fragment GameListFragment on GameEdge {
    node {
      id,
      ...GameFragment
    }
  }
`)

export function GamesSection({ games, title }: {
  games: readonly DocumentType<typeof GameListFragment>[];
  title: string;
}) {
  return (
    <SectionContainer cn="flex-1">
      <SectionTitle label={title} />
      <ScrollView className="grow">
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
    </SectionContainer>
  );
}

export function GameListItem({ game, first, last }: {
  game: DocumentType<typeof GameFragment>;
  first: boolean;
  last: boolean;
}) {
  const { teamA, teamB, teamAAccuracy, result } = useMemo(() => {
    const teamA = useFragment(TeamScoreFragment, game?.teamGameCollection.edges?.[0]?.node);
    const teamB = useFragment(TeamScoreFragment, game?.teamGameCollection.edges?.[1]?.node);

    const teamAShoots = teamA?.shootsCollection.edges.map((e) => e.node);
    const teamBShoots = teamB?.shootsCollection.edges.map((e) => e.node);

    const teamAAccuracy = teamAShoots ? shootsAccuracy(teamAShoots) : 0;
    const result = teamAShoots && teamBShoots ? gameResult(teamAShoots, teamBShoots) : undefined;
    return { teamA, teamB, teamAAccuracy, result } as const;
  }, [game]);

  const navigation = useAppNavigation();
  const handleOnPress = () => {
    navigation.navigate("Game", { gameId: game.id });
  };

  if (game?.teamGameCollection.edges.length != 2) {
    return null;
  }

  const catA = teamA.team.category.name
  const catB = teamB.team.category.name

  return (
    <Card
      cn="mb-1"
      first={first}
      last={last}
      isListItem
      border={result === "draw"}
    >
      <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={gameResultGradientColors[result]} className="rounded-xl py-1 px-4">
        <View className="flex-row">
          <View className="w-2/5">
            {teamA && <TeamScore cn="items-start" teamGame={teamA as DocumentType<typeof TeamScoreFragment>} />}
          </View>
          <View className="items-center w-1/5">
            <StyledText>{game.duration}&apos;</StyledText>
            {<CustomButton onPress={handleOnPress}>
              <AntDesign name="eye" size={24} color="#DF8C5F" />
            </CustomButton>}
          </View>
          <View className="w-2/5">
            {teamB && <TeamScore
              teamGame={teamB as DocumentType<typeof TeamScoreFragment>}
              cn="items-end"
            />}
          </View>
        </View>
        <View className="flex-row justify-between mt-1 text-xs">
          <StyledText cn="mt-1 text-xs text-gray-800">
            Accuracy: {teamAAccuracy}%
          </StyledText>
          <StyledText cn="text-gray-800">
            {getCategoryName(catA)} {catB !== catA && `VS ${getCategoryName(teamB.team.category.name)}`}{game.name && ` - ${game.name}`}
          </StyledText>
        </View>
      </LinearGradient>
    </Card>
  );
}

export function TeamScore({ teamGame, cn }: {
  teamGame: DocumentType<typeof TeamScoreFragment>;
  cn?: string;
}) {
  const { points, goals, score } = useMemo(() => {
    const points = teamGame.shootsCollection.edges.filter((e) => e.node.type === "drop");
    const goals = teamGame.shootsCollection.edges.filter((e) => e.node.type === "goal");
    const score = sumShoots([...points.map(p => p.node), ...goals.map(p => p.node)]);
    return { points, goals, score }
  }, [])
  return (
    <View className={cn}>
      <StyledText cn="text-lg text-gray-600">{teamGame.team.teamName}</StyledText>
      <StyledText cn="text-lg text-gray-600">
        {points.length} - {goals.length} ({score})
      </StyledText>
    </View>
  );
}
