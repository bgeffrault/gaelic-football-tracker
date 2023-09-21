"use client";
import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function CreateGameDialog() {
  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <DialogTitle>Ajouter un match</DialogTitle>

        <DialogContent>
          <h3>Nom de l'équipe adverse *</h3>
          <TextField
            required
            margin="dense"
            id="name"
            label="Nantes A"
            type="text"
            fullWidth
          />
          <h3>Durée du match *</h3>
          <TextField
            required
            margin="dense"
            id="duree"
            label="60"
            type="number"
            fullWidth
          />
          <h3>Joueurs *</h3>
          <TextField
            required
            margin="dense"
            id="outlined-select-currency"
            label="0"
            select
            fullWidth
          />
          <h3>Compétition</h3>
          <TextField
            margin="dense"
            id="name"
            label="Coupe de Bretagne"
            type="text"
            fullWidth
          />
          <h3>Date</h3>
          <TextField
            margin="dense"
            id="name"
            type="text"
            defaultValue={formattedDate}
            fullWidth
          />

          <DialogActions>
            <Button onClick={handleClose}>Ajouter</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
