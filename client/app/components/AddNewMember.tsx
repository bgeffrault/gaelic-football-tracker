"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, MenuItem, SelectChangeEvent } from "@mui/material";
import supabase, { Tables } from "../config/supabaseClient";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "./FormField";
import FormSelect from "./FormSelect";

type Inputs = {
  firstName: string;
  lastName: string;
  pseudo: string;
  categoryId: number;
  clubId: number;
};

export default function AddNewMember() {
  const [open, setOpen] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>("");
  const [categories, setCategories] = useState<Tables<"Category">[] | null>(
    null
  );
  const [clubs, setClubs] = useState<Tables<"Club">[] | null>(null);

  const [category, setCategory] = useState("");
  const handleChangeCategories = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const [club, setClub] = useState("");
  const handleChangeClubs = (event: SelectChangeEvent) => {
    setClub(event.target.value as string);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const { data: categories, error } = await supabase
        .from("Category")
        .select("*");
      const { data: clubs } = await supabase.from("Club").select("*");
      if (error) {
        setFetchError("Could not fetch the members");
        setCategories(null);
        setClubs(null);
        console.error(error);
      }
      if (categories) {
        setCategories(categories);
        setFetchError(null);
      }
      if (clubs) {
        setClubs(clubs);
        setFetchError(null);
      }
    };
    fetchCategory();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await supabase.from("Members").insert({
      firstName: data.firstName,
      lastName: data.lastName,
      categoryId: data.categoryId,
      clubId: data.clubId,
      pseudo: data.pseudo,
    });

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
        <DialogTitle>Ajouter un membre</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <FormField
              label="Prémon *"
              placeholder="Jean"
              margin="dense"
              id="firstName"
              type="text"
              register={register}
              name="firstName"
              errors={errors.firstName!}
              span="Le Prénom est requis"
            />
            <FormField
              label="Nom *"
              placeholder="Dupont"
              margin="dense"
              id="lastName"
              type="text"
              register={register}
              name="lastName"
              errors={errors.lastName!}
              span="Le Nom est requis"
            />
            <FormSelect
              register={register}
              name="categoryId"
              errors={errors.categoryId!}
              span="La Catégorie est requise"
              id="demo-simple-select-label"
              labelId="demo-simple-select-label"
              label="Category *"
              margin="dense"
              value={category}
              handleChange={handleChangeCategories}
            >
              {categories?.map((category) => (
                <MenuItem value={category.id}>{category.name}</MenuItem>
              ))}
            </FormSelect>
            <FormSelect
              register={register}
              name="clubId"
              errors={errors.clubId!}
              span="Le Club est requis"
              id="demo-simple-select-label"
              labelId="demo-simple-select-label"
              label="Club *"
              margin="dense"
              value={club}
              handleChange={handleChangeClubs}
            >
              {clubs?.map((club) => (
                <MenuItem value={club.id}>{club.name}</MenuItem>
              ))}
            </FormSelect>
            <FormField
              label="Pseudo"
              placeholder="JD"
              margin="dense"
              id="pseudo"
              type="text"
              register={register}
              name="pseudo"
              errors={errors.pseudo!}
              span="Le Pseudo est requis"
            />
            <DialogActions>
              <Button type="submit">Ajouter</Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
