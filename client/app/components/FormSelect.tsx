/* eslint-disable react/no-unknown-property */
import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

type Inputs = {
  firstName: string
  lastName: string
  pseudo: string
  categoryId: number
  clubId: number
}

type FormSelectProps = {
  register: UseFormRegister<Inputs>
  errors: FieldErrors<Inputs>
  label: string
  margin?: 'dense' | 'normal' | 'none' | undefined
  id: string
  labelId: string
  span: string
  name: 'firstName' | 'lastName' | 'pseudo' | 'categoryId' | 'clubId'
  value: string
  children: React.JSX.Element[] | undefined
  handleChange: (event: SelectChangeEvent) => void
}

const FormSelect = ({
  register,
  errors,
  label,
  margin,
  id,
  labelId,
  value,
  span,
  name,
  children,
  handleChange,
}: FormSelectProps): React.JSX.Element => {
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
            value: '',
            onChange: handleChange,
          })}
        >
          {children}
        </Select>
      </FormControl>
      {!value ? errors && <span error-message="">{span} </span> : null}
    </>
  )
}

export default FormSelect
