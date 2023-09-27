import React from "react";
import { ListItem } from "@mui/material";
import { Tables } from "../config/supabaseClient";

export type TableMembersShoots = Tables<"Members"> & {
  Shoots: Tables<"Shoots">[];
};

export type CardsProps = {
  members: TableMembersShoots;
};

const MembersShootsList = ({ members }: CardsProps) => {
  const { firstName, lastName, Shoots } = members;

  const goal = Shoots.map((shoot) => {
    return shoot.type === "goal" ? 3 : 0;
  }).reduce((previousValue: number, currentValue: number) => {
    return previousValue + currentValue;
  }, 0);
  const drop = Shoots.map((drop) => {
    return drop.type === "drop" ? 1 : 0;
  }).reduce((previousValue: number, currentValue: number) => {
    return previousValue + currentValue;
  }, 0);

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

        <p>{`${goal + drop} pts`}</p>
      </ListItem>
    </>
  );
};

export default MembersShootsList;
