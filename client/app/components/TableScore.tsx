import { Box } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React from "react";
import { Tables } from "../config/supabaseClient";

export type TableScoreGame = Tables<"Game"> & {
  TeamGame: (Tables<"TeamGame"> & { Team: Tables<"Team"> })[];
};

export type CardsProps = {
  game: TableScoreGame;
};

const TableScore = ({ game }: CardsProps) => {
  const { TeamGame, gameEnded } = game;
  if (TeamGame.length !== 2) {
    console.warn("This game has the wrong of TeamGame", game.id);
    return null;
  }

  const isFirstTeamExternal = TeamGame[0].Team.external;

  const firstTeam = !isFirstTeamExternal
    ? TeamGame[0].Team.teamName
    : TeamGame[1].Team.teamName;

  const secondTeam = isFirstTeamExternal
    ? TeamGame[0].Team.teamName
    : TeamGame[1].Team.teamName;

  TeamGame[0].Team.teamName;
  const win = "firstTeam.score" < "secondTeam.score";
  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
        height: "100px",
        backgroundColor: !win ? "rgb(167, 196, 197)" : "red",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h4 style={{ marginBottom: "15px" }}>{firstTeam}</h4>
        </div>
        <p>Accuracy: {"accuracy"} </p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h5> {"duration"} ' </h5>
        {gameEnded === false ? <PlayCircleOutlineIcon /> : "-"}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h4 style={{ marginBottom: "15px" }}>{secondTeam}</h4>
        </div>
      </Box>
    </Box>
  );
};

export default TableScore;
