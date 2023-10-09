import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { CustomButton } from "../../components/CustomButton";
import { StyledText } from "../../components/StyledText";
import { gameResultGradientColors, getGameResult, getTeamResult } from "../../utils/shootsUtils";
import { useAppNavigation } from "../../navigators";
import { DocumentType, graphql } from "../../gql/gql";
import { useFragment } from "../../gql";
import { SectionTitle } from "../../components/SectionTitle";
import { LinearGradient } from 'expo-linear-gradient';
import { SectionContainer } from "../../components/SectionContainer";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

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
          id
          team {
            external
            teamName
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
    <SectionContainer >
      <SectionTitle label={title} />
      {games.filter(({ node }) => {
        const game = useFragment(GameFragment, node)
        return game?.teamGameCollection.edges.length == 2
      }).map(({ node }, i, arr) => {
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
    </SectionContainer>
  );
}

export function GameListItem({ game, first, last }: {
  game: DocumentType<typeof GameFragment>;
  first: boolean;
  last: boolean;
}) {
  const navigation = useAppNavigation();
  const handleOnPress = () => {
    navigation.navigate("Game", { gameId: game.id, isOpponentTeamSelected: false });
  };

  if (game?.teamGameCollection.edges.length != 2) {
    return null;
  }

  const teamGames = game?.teamGameCollection.edges
  const isNode1External = teamGames[0]?.node?.team?.external;
  const teamGame = isNode1External ? teamGames[1]?.node : teamGames[0]?.node;
  const opponentTeamGame = isNode1External ? teamGames[0]?.node : teamGames[1]?.node;

  const teamScore = useTeamScore(teamGame.id);
  const opponentTeamScore = useTeamScore(opponentTeamGame.id);

  const result = getGameResult({ teamScore, opponentTeamScore });
  const date = DateTime.fromISO(game.date).toFormat("dd-MM-yyyy");

  return (
    <Card
      cn="mb-1"
      first={first}
      last={last}
      isListItem
      border={result === "draw"}
    >
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={gameResultGradientColors[result]}
        className="rounded-xl py-1 px-4">
        <View className="flex-row">
          <View className="w-2/5">
            <TeamScore cn="items-start" teamScore={teamScore} teamName={teamGame.team.teamName} />
          </View>
          <View className="items-center w-1/5">
            <StyledText>{game.duration}&apos;</StyledText>
            {<CustomButton onPress={handleOnPress}>
              <AntDesign name="eye" size={24} color="#DF8C5F" />
            </CustomButton>}
          </View>
          <View className="w-2/5">
            <TeamScore cn="items-end" teamScore={opponentTeamScore} teamName={opponentTeamGame.team.teamName} />
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <StyledText cn='text-gray-400'>{game.name}</StyledText>
          <StyledText cn='text-gray-400'>{date}</StyledText>
        </View>
      </LinearGradient>
    </Card>
  );
}

export type TeamScore = {
  teamGameId: number;
  type: "point" | "goal" | "missed" | "blocked";
  count: number;
  gameId: number;
}

const useTeamScore = (teamGameId?: number) => {
  const supabaseClient = useSupabaseClientContext();

  const { data: teamScore } = useQuery({
    queryKey: ["teamScore", { teamGameId }],
    queryFn: async () => {
      const result = await supabaseClient.from('TeamScore').select('*').filter('teamGameId', 'eq', teamGameId)
      return result.data as TeamScore[]
    },
  })

  return {
    pointCount: teamScore?.filter((shoot) => shoot.type === "point")?.[0]?.count ?? 0,
    goalCount: teamScore?.filter((shoot) => shoot.type === "goal")?.[0]?.count ?? 0,
    missedCount: teamScore?.filter((shoot) => shoot.type === "missed")?.[0]?.count ?? 0,
    blockedCount: teamScore?.filter((shoot) => shoot.type === "blocked")?.[0]?.count ?? 0,
  }
}

const TeamScore = ({ teamScore, teamName, cn }: {
  cn?: string;
  teamName: string;
  teamScore: ReturnType<typeof useTeamScore>;
}) => {
  const { pointCount, goalCount, missedCount, blockedCount } = teamScore;
  const score = getTeamResult({ pointCount, goalCount, missedCount, blockedCount });

  return (
    <View className={cn}>
      <StyledText cn="text-lg text-gray-600">{teamName}</StyledText>
      <StyledText cn="text-lg text-gray-600">
        {goalCount} - {pointCount} ({score.result})
      </StyledText>
    </View>
  );
}
