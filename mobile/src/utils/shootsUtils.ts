import { GameResult } from "../types/Game";
import { TeamShoots } from "../types/Team";

export const gameResultColors = {
  win: "bg-[#DFF7EC]",
  lose: "bg-[#D3733D]",
  draw: "bg-white",
};

export const gameResultGradientColors = {
  win: ["#DFF7EC", "#FFF"],
  lose: ["#FFF", "#FCC7B8"],
  draw: ["#AAAAAA11", "#AAAAAA33", "#AAAAAA11"],
};

type Shoot = {
  type: string;
};

export const sumShoots = (shoots: Shoot[]) => {
  return shoots.reduce((sum, shoot) => {
    switch (shoot.type) {
      case "goal":
        return sum + 3;
      case "drop":
        return sum + 1;
      default:
        return sum;
    }
  }, 0);
};

export function gameResult(shootsTeamA: Shoot[], shootsTeamB: Shoot[]) {
  const teamA = sumShoots(shootsTeamA);
  const teamB = sumShoots(shootsTeamB);

  if (teamA > teamB) return "win";
  if (teamA < teamB) return "lose";
  return "draw";
}

export function shootsAccuracy(shoots: Shoot[]) {
  let scored = 0;
  let total = 0;
  shoots.forEach(({ type }) => {
    if (type === "goal" || type === "drop") scored += 1;
    total += 1;
  });
  if (total === 0) return null;
  return Math.round((scored / total) * 100);
}

// Utils with db views

export const getActionsCountByType = (
  teamActions: GameResult[],
): TeamShoots => {
  return {
    pointCount: teamActions.find((gr) => gr.type === "point")?.count ?? 0,
    goalCount: teamActions.find((gr) => gr.type === "goal")?.count ?? 0,
    missedCount: teamActions.find((gr) => gr.type === "missed")?.count ?? 0,
    blockedCount: teamActions.find((gr) => gr.type === "blocked")?.count ?? 0,
  };
};

export function getTeamResult({
  pointCount,
  goalCount,
  missedCount,
  blockedCount,
}: TeamShoots) {
  return {
    result: pointCount + goalCount * 3,
    accuracy: Math.round(
      ((pointCount + goalCount) /
        (pointCount + goalCount + missedCount + blockedCount)) *
        100,
    ),
  };
}

export function getGameResult(
  teamActionsCountByType: TeamShoots,
  opponentActionsCountByType: TeamShoots,
) {
  const teamResult = getTeamResult(teamActionsCountByType);
  const opponentResult = getTeamResult(opponentActionsCountByType);
  // eslint-disable-next-line no-nested-ternary
  return teamResult.result > opponentResult.result
    ? "win"
    : teamResult.result < opponentResult.result
      ? "lose"
      : "draw";
}
