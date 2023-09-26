import { TextField } from "@mui/material";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  pseudo: string;
  categoryId: number;
  clubId: number;
};

type Testt = {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  label: string;
  placeholder: string;
  margin?: "dense" | "normal" | "none" | undefined;
  id: string;
  type: string;
  span: string;
  name: "firstName" | "lastName" | "pseudo" | "categoryId" | "clubId";
};

const FormField = ({
  register,
  errors,
  label,
  placeholder,
  margin,
  id,
  type,
  span,
  name,
}: Testt) => {
  return (
    <>
      <TextField
        label={label}
        placeholder={placeholder}
        margin={margin}
        id={id}
        type={type}
        fullWidth
        {...register(name, { required: true })}
      />
      {errors && <span>{span} </span>}
    </>
  );
};

export default FormField;
