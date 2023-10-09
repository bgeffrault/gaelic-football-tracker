import { FormControl, InputLabel, Select } from '@mui/material'
import React from 'react'
import {
  Control,
  FieldValues,
  Path,
  UseFormRegister,
  useFormState,
} from 'react-hook-form'

type FormSelectProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  label: string
  margin?: 'dense' | 'normal' | 'none' | undefined
  id: string
  labelId: string
  errorMessage: string
  name: Path<T>
  children: React.JSX.Element[] | undefined
  defaultValue: string | number
  control: Control<T>
}

const FormSelect = <T extends FieldValues>({
  register,
  label,
  margin,
  id,
  labelId,
  errorMessage,
  name,
  children,
  defaultValue,
  control,
}: FormSelectProps<T>): React.JSX.Element => {
  const { isDirty, errors } = useFormState({ control })
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

      {!isDirty
        ? errors[name] && <span error-message="">{errorMessage} </span>
        : null}
    </>
  )
}

export default FormSelect
