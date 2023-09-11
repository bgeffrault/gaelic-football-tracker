import { Box } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React from "react";
import { CardsProps } from "../types";
import team from "../testArray";

const Cards = ({ firstTeam, secondTeam, title, test }: CardsProps) => {
  return (
    <>
      <Box sx={{ padding: "30px" }}>
        <h3
          style={{ backgroundColor: "rgb(209, 130, 73)", marginBottom: "10px" }}
        >
          {title}
        </h3>

        <Box
          sx={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "10px",
            height: "100px",
            backgroundColor: "rgb(167, 196, 197)",
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
            <h4>{firstTeam}</h4>
            <h4>4 - 1 (7)</h4>
            <p>Accuracy: 60%</p>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h5>60'</h5>
            {test === true ? <PlayCircleOutlineIcon /> : "-"}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h4>{secondTeam}</h4>
            <h4>1 - 0 (1)</h4>
          </Box>
        </Box>
      </Box>
      {/* {team.map((el) => {
        return <li>{el} </li>;
      })} */}
    </>
  );
};

export default Cards;
