import React from "react";
import { ListItem } from "@mui/material";

export interface member {
  categoryId: number;
  clubId: number;
  firstName: string;
  lastName: string;
  pseudo: string | null;
}

const MembersList = ({
  categoryId,
  clubId,
  firstName,
  lastName,
  pseudo,
}: member) => {
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
        <p>
          {clubId} pts - {categoryId}%
        </p>
      </ListItem>
    </>
  );
};

export default MembersList;
