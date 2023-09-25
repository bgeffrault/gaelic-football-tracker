import clsx from "clsx";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { CustomButton } from "../../components/CustomButton";
import { StyledText } from "../../components/StyledText";
import { gameResult, gameResultColors, shootsAccuracy, sumShoots } from "../../utils/shootsUtils";
import { useAppNavigation } from "../../navigators";
import { DocumentType, graphql } from "../../gql/gql";
import { useFragment } from "../../gql";
import { SectionTitle } from "../../components/SectionTitle";

export const TeamScoreFragment = graphql(/* GraphQL */ `
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

export const GameFragment = graphql(/* GraphQL */ `
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
        <View className="">
            <SectionTitle>
                {title}
            </SectionTitle>
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

export function GameListItem({ game, first, last }: {
    game: DocumentType<typeof GameFragment>;
    first: boolean;
    last: boolean;
}) {
    const { teamA, teamB, teamAAccuracy, result } = useMemo(() => {
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

    if (game?.teamGameCollection.edges.length != 2) {
        console.warn("The game has the wrong number of teamGames. GameId: ",
            game.id, "; teamGames: ",
            game?.teamGameCollection.edges.length, ";")
        return null;
    }

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

export function TeamScore({ teamGame }: {
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