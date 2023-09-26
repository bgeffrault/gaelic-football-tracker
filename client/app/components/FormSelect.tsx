import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
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
  margin?: "dense" | "normal" | "none" | undefined;
  id: string;
  labelId: string;
  span: string;
  name: "firstName" | "lastName" | "pseudo" | "categoryId" | "clubId";
  value: string;
  categories: React.JSX.Element[] | undefined;
  handleChange: (event: SelectChangeEvent) => void;
};

const FormField = ({
  register,
  errors,
  label,
  margin,
  id,
  labelId,
  value,
  span,
  name,
  categories,
  handleChange,
}: Testt) => {
  return (
    <>
      <FormControl fullWidth margin={margin}>
        <InputLabel id={id}> {label} </InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={value}
          label={label}
          {...register(name, {
            required: true,
            value: "",
            onChange: handleChange,
          })}
        >
          {categories}
        </Select>
      </FormControl>
      {!value ? errors && <span>{span} </span> : null}
    </>
  );
};

export default FormField;
