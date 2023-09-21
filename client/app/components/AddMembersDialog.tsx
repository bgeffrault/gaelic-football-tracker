"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box } from "@mui/material";
import supabase from "../config/supabaseClient";

export default function AddMembersDialog() {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [pseudo, setPseudo] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const insertMembers = async () => {
      try {
        const { data, error } = await supabase.from("Members").insert({
          firstName: firstName,
          lastName: lastName,
          categoryId: 1,
          clubId: 1,
          pseudo: pseudo,
        });
        if (data) {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    insertMembers();
    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{ textDecoration: "none", color: "black" }}
          onClick={handleClickOpen}
        >
          <AddCircleOutlineIcon />
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un membre</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="name"
            label="Prénom"
            type="text"
            fullWidth
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="lastName"
            label="Nom"
            type="text"
            fullWidth
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="pseudo"
            label="Pseudo"
            type="text"
            fullWidth
            onChange={(e) => setPseudo(e.target.value)}
          />
          <DialogActions>
            <Button onClick={handleClose}>Ajouter</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
