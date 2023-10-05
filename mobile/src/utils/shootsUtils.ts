export const gameResultColors = {
  win: "bg-[#DFF7EC]",
  lose: "bg-[#D3733D]",
  draw: "bg-white",
};

export const gameResultGradientColors = {
  win: ["#DFF7EC", '#FFF'],
  lose: ["#FCC7B8", '#FFF'],
  draw: ["#FFF", '#FFF'],
};

type Shoot = {
  type: string;
}

export const sumShoots = (shoots: Shoot[]) => {
  let sum = 0;
  for (const shoot of shoots) {
    if (shoot.type === "goal") {
      sum += 3;
      continue;
    }
    if (shoot.type === "drop") sum += 1;
  }
  return sum;
}

export function gameResult(
  shootsTeamA: Shoot[], shootsTeamB: Shoot[]) {
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
    if (type === "goal" || type === "drop") scored++;
    total++;
  });
  if (total === 0) return null;
  return scored / total * 100;
}
