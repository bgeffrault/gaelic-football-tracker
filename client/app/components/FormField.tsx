import { TextField } from '@mui/material'
import React from 'react'
import {
  Control,
  FieldValues,
  Path,
  UseFormRegister,
  useFormState,
} from 'react-hook-form'

type FormFieldProps<T extends FieldValues> = {
  register: UseFormRegister<T>

  label: string
  placeholder: string
  margin?: 'dense' | 'normal' | 'none' | undefined
  id: string
  type: string
  errorMessage: string
  name: Path<T>
  isRequired: boolean
  control: Control<T>
}

const FormField = <T extends FieldValues>({
  register,

  label,
  placeholder,
  margin,
  id,
  type,
  errorMessage,
  name,
  isRequired,
  control,
}: FormFieldProps<T>): React.JSX.Element => {
  const { errors } = useFormState({ control })
  return (
    <>
      <TextField
        label={label}
        placeholder={placeholder}
        margin={margin}
        id={id}
        type={type}
        fullWidth
        {...register(name, { required: isRequired })}
      />
      {errors[name] && <span error-message="">{errorMessage} </span>}
    </>
  )
}

export default FormField
