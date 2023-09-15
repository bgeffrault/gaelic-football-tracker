import { Box } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React from "react";

export interface CardsProps {
  firstTeam: {
    name: string;
    goalCage: number;
    goalDrop: number;
    score: number;
  };
  secondTeam: {
    name: string;
    goalCage: number;
    goalDrop: number;
    score: number;
  };
  progress: number;
  matchIsProgress: boolean;
}

const Cards = ({
  firstTeam,
  secondTeam,
  matchIsProgress,
  progress,
}: CardsProps) => {
  const win = firstTeam.score < secondTeam.score;
  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
        height: "100px",
        // backgroundColor: "rgb(167, 196, 197)",
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
          <h4 style={{ marginBottom: "15px" }}>{firstTeam.name}</h4>
          <h4>
            {firstTeam.goalCage} - {firstTeam.goalDrop} ({firstTeam.score})
          </h4>
        </div>
        <p>Accuracy: {progress} </p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h5>60'</h5>
        {matchIsProgress === true ? <PlayCircleOutlineIcon /> : "-"}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h4 style={{ marginBottom: "15px" }}>{secondTeam.name}</h4>
          <h4>
            {secondTeam.goalCage} - {secondTeam.goalDrop} ({secondTeam.score})
          </h4>
        </div>
      </Box>
    </Box>
  );
};

export default Cards;
