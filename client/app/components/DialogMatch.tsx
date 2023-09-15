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

export default function DialogMatch() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
        <div className="dialog-container">
          <DialogTitle className="dialog-title">Ajouter un match</DialogTitle>
          <div style={{ display: "flex" }}>
            <DialogContent className="dialog-content-team">
              <h3>Equipe 1</h3>
              <TextField
                className="text-field"
                required
                margin="dense"
                id="name"
                label="nom"
                type="text"
                fullWidth
              />
              <TextField
                required
                margin="dense"
                id="surname"
                label="goalCage"
                type="number"
                fullWidth
              />
              <TextField
                required
                margin="dense"
                id="pseudo"
                label="goalDrop"
                type="number"
                fullWidth
              />
            </DialogContent>
            <DialogContent className="dialog-content-team">
              <h3>Equipe 1</h3>
              <TextField
                className="text-field"
                required
                margin="dense"
                id="name"
                label="nom"
                type="text"
                fullWidth
              />
              <TextField
                required
                margin="dense"
                id="surname"
                label="goalCage"
                type="number"
                fullWidth
              />
              <TextField
                required
                margin="dense"
                id="pseudo"
                label="goalDrop"
                type="number"
                fullWidth
              />
            </DialogContent>
          </div>
          <DialogActions className="dialog-actions">
            <Button className="add-button" onClick={handleClose}>
              Ajouter
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
