export type Team = {
  id: number;
  teamName: string;
  external: boolean;
  categoryId: number;
  clubId: number;
};

export type TeamShoots = {
  pointCount: number;
  goalCount: number;
  missedCount: number;
  blockedCount: number;
};
