import React from "react";
import { Box } from "@mui/material";

export interface HeaderProps {
  name: string;
}

const Header = ({ name }: HeaderProps) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgb(209, 130, 73)",
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <h1>{name}</h1>
      </Box>
    </>
  );
};

export default Header;
