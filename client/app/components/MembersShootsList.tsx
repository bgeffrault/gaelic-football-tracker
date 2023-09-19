import React from "react";
import { ListItem } from "@mui/material";
import { Tables } from "../config/supabaseClient";

export interface MembersShootListProps {
  shoot: Tables<"Shoots">;
  members: Tables<"Members">;
}

const MembersShootsList = ({
  shoot: { x, y, type },
  members: { firstName, lastName },
}: MembersShootListProps) => {
  return (
    <>
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "2px solid black",
          "&:first-of-type": { borderTop: 0 },
        }}
      >
        <h4>
          {firstName} {lastName}
        </h4>
        <p>{(type === "goal" ? 3 : 0) | (type === "drop" ? 1 : 0)} </p>
      </ListItem>
    </>
  );
};

export default MembersShootsList;
