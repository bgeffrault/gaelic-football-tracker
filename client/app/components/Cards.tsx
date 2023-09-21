import { Box } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React from "react";
import { Tables } from "../config/supabaseClient";

export interface CardsProps {
  game: Tables<"Game">;
}

const Cards = ({ game: { duration, gameEnded } }: CardsProps) => {
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
          <h4 style={{ marginBottom: "15px" }}>{"firstteamName"}</h4>
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
        <h5> {duration} ' </h5>
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
          <h4 style={{ marginBottom: "15px" }}>{"secondTeamName"}</h4>
        </div>
      </Box>
    </Box>
  );
};

export default Cards;
