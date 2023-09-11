import React from "react";
import Cards from "./Cards";

const InProgress = () => {
  return (
    <div style={{ padding: "50px" }}>
      <h3 style={{ backgroundColor: "rgb(209, 130, 73)" }}>In progress</h3>
      <Cards firstTeam="Rennes A" secondTeam="Nantes A" />
    </div>
  );
};

export default InProgress;
