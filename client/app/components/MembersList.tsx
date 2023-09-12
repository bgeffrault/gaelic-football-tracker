import React from "react";
import { ListItem } from "@mui/material";

export interface MembersListProps {
  firstName: string;
  lastName: string;
  points: number;
  pourcentage: number;
}

const MembersList = ({
  firstName,
  lastName,
  points,
  pourcentage,
}: MembersListProps) => {
  return (
    <>
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "2px solid black",
          "&:first-child": { borderTop: 0 },
        }}
      >
        <h4>
          {firstName} {lastName}
        </h4>
        <p>
          {points} pts - {pourcentage}%
        </p>
      </ListItem>
    </>
  );
};

export default MembersList;
