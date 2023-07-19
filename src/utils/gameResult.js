import { sumScore } from "./sumScore";

export const gameResultColors = {
  win: "bg-[#90CBD7AA]",
  lose: "bg-[#D3733DAA]",
  draw: "bg-[#D3D3D3AA]",
};

export function gameResult(game) {
  const us = sumScore(game.teamsScore.us);
  const them = sumScore(game.teamsScore.them);

  if (us > them) return "win";
  if (us < them) return "lose";
  return "draw";
}
