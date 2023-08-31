export interface MemberType {
    firstName: string;
    lastName: string;
    id: number;
    categoryId: number;
}

export interface ClubType {
    members: MemberType[];
    teamName: string;
}

export type Player = {
    id: number;
    firstName: string;
    lastName: string;
}

export type Score = {
    points: { x: number; y: number; playerId: number }[];
    goals: { x: number; y: number; playerId: number }[];
    missed: { x: number; y: number; playerId: number }[];
    blocked: { x: number; y: number; playerId: number }[];
    accuracy: number | null;
}

export type TeamScore = {
    us: Score;
    them: Score;
}

export type Game = {
    id: number;
    players: Player[];
    opponentName: string;
    teamName: string;
    duration: number;
    gameName: string;
    date: string;
    teamsScore: TeamScore;
    gameEnded: boolean;
}
