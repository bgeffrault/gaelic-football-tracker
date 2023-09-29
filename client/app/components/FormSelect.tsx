/* eslint-disable react/no-unknown-property */
import { FormControl, InputLabel, Select } from '@mui/material'
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
  children: React.JSX.Element[] | undefined
  defaultValue: string | number
}

const FormSelect = ({
  register,
  errors,
  label,
  margin,
  id,
  labelId,
  span,
  name,
  children,
  defaultValue
}: FormSelectProps): React.JSX.Element => {
  return (
    <>
      <FormControl fullWidth margin={margin}>
        <InputLabel id={id}> {label} </InputLabel>
        <Select
          labelId={labelId}
          id={id}
          label={label}
          defaultValue={defaultValue}
          {...register(name, {
            required: true,
          })}
        >
          {children}
        </Select>
      </FormControl>
      {errors && <span error-message="">{span} </span>}
    </>
  )
}

export default FormSelect
