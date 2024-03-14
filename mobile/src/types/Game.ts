import { TeamShoots } from "./Team";

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
};

export type TeamGameResult = {
  gameResults: GameResult[];
  teamName: string;
  external: boolean;
  categoryId: number;
  actionsCountByType: TeamShoots;
};

export type GameResultByTeam = {
  teamGame: TeamGameResult;
  opponentTeamGame: TeamGameResult;
  id: number;
  gameEnded: boolean;
  name: string;
  duration: number;
  date: string;
  outcome: "win" | "lose" | "draw";
};

export type GameContent = GameResultByTeam[];

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
};
