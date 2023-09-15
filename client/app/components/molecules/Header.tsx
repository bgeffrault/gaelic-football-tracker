import React from "react";
import { Box } from "@mui/material";
import SimpleDialogDemo from "../Dialog";
import DialogMatch from "../DialogMatch";
import Link from "next/link";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export interface HeaderProps {
  name: string;
  backHome: string;
}

const Header = ({ name, backHome }: HeaderProps) => {
  return backHome !== "backHome" ? (
    <>
      <Box
        sx={{
          backgroundColor: "rgb(209, 130, 73)",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <KeyboardArrowLeftIcon />
          <Link style={{ textDecoration: "none", color: "black" }} href="/">
            Home
          </Link>
        </div>
        <h1>{name}</h1>
        <SimpleDialogDemo />
      </Box>
    </>
  ) : (
    <>
      <Box
        sx={{
          backgroundColor: "rgb(209, 130, 73)",
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ margin: "auto" }}>{name}</h1>
        <DialogMatch />
      </Box>
    </>
  );
};

export default Header;
