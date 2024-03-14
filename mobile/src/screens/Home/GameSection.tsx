import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { CustomButton } from "../../components/CustomButton";
import { StyledText } from "../../components/StyledText";
import { TeamShoots, gameResultGradientColors, getActionsCountByType, getTeamResult } from "../../utils/shootsUtils";
import { useAppNavigation } from "../../navigators";
import { SectionTitle } from "../../components/SectionTitle";
import { LinearGradient } from 'expo-linear-gradient';
import { SectionContainer } from "../../components/SectionContainer";
import { DateTime } from "luxon";


export type GameResult = {
  categoryId: number;
  clubId: number;
  count: number;
  date: string;
  duration: number;
  external: boolean;
  gameEnded: boolean;
  id: number;
  name: string;
  teamGameId: number;
  teamName: string;
  type: string;
}

type TeamGameResult = {
  gameResults: GameResult[];
  teamName: string;
  external: boolean;
  categoryId: number;
  actionsCountByType: TeamShoots;
}

export type GameResultByTeam = {
  teamGame: TeamGameResult;
  opponentTeamGame: TeamGameResult;
  id: number;
  gameEnded: boolean;
  name: string;
  duration: number;
  date: string;
  outcome: "win" | "lose" | "draw";
}

export type GameContent = GameResultByTeam[]

export type Game = {
  id: number;
  gameEnded: boolean;
  name: string;
  duration: number;
  date: string;
  GameResult: GameResult[];
  TeamGame: {
    id: number;
    Team: {
      teamName: string;
      external: boolean;
      categoryId: number;
    };
  }[];
}


export function GamesSection({ games, title }: {
  games: GameContent;
  title: string;
}) {
  return (
    <SectionContainer >
      <SectionTitle label={title} />
      {games.map(((game, i, arr) => {
        return (
          <GameListItem
            key={game.id}
            game={game}
            first={i === 0}
            last={i === arr.length - 1}
          />
        )
      }))}
    </SectionContainer>
  );
}



export function GameListItem({ game, first, last}: {
  game: GameResultByTeam;
  first: boolean;
  last: boolean;
}) {
  const navigation = useAppNavigation();
  const teamGame = game.teamGame;
  const opponentTeamGame = game.opponentTeamGame;

  const date = DateTime.fromISO(game.date).toFormat("dd-MM-yyyy");
  const gameName = game.name

  const handleOnPress = () => {
    navigation.navigate("Game", { gameResult: game, isOpponentTeamSelected: false });
  };
  
  return (
    <Card
      cn="mb-1"
      first={first}
      last={last}
      isListItem
    >
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={gameResultGradientColors[game.outcome]}
        className="rounded-xl py-1 px-4">
        <View className="flex-row">
          <View className="w-2/5">
            <TeamScore cn="items-start" teamScore={teamGame.actionsCountByType} teamName={teamGame.teamName} />
          </View>
          <View className="items-center w-1/5">
            <StyledText>{game.duration}&apos;</StyledText>
            <CustomButton onPress={handleOnPress}>
              <AntDesign name="eye" size={24} color="#DF8C5F" />
            </CustomButton>
          </View>
          <View className="w-2/5">
            <TeamScore cn="items-end" teamScore={opponentTeamGame.actionsCountByType} teamName={opponentTeamGame.teamName} />
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <StyledText cn='text-gray-400'>{gameName}</StyledText>
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

const TeamScore = ({ teamScore, teamName, cn }: {
  cn?: string;
  teamName: string;
  teamScore: ReturnType<typeof getActionsCountByType>;
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
