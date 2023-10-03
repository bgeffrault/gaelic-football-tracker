import {
  FormControl,
  InputLabel,
  MenuProps,
  Select,
  SelectChangeEvent,
} from '@mui/material'
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
  errorMessage: string
  label: string
  id: string
  value?: string[]
  onChange: (event: SelectChangeEvent<string[]>) => void
  renderValue: ((value: string[]) => React.ReactNode) | undefined
  MenuProps: Partial<MenuProps>
  children: React.JSX.Element[] | undefined
  name: Path<T>
  control: Control<T>
}

const FormMultiSelect = <T extends FieldValues>({
  register,
  children,
  label,
  id,
  value,
  onChange,
  renderValue,
  MenuProps,
  errorMessage,
  control,
  name,
}: FormSelectProps<T>): React.JSX.Element => {
  const { errors } = useFormState({ control })
  return (
    <>
      <FormControl fullWidth margin="dense">
        <InputLabel id={id}>Joueurs *</InputLabel>
        <Select
          label={label}
          id={id}
          multiple
          value={value}
          renderValue={renderValue}
          MenuProps={MenuProps}
          fullWidth
          {...register(name, {
            required: true,
            onChange: onChange,
          })}
        >
          {children}
        </Select>
      </FormControl>
      {errors[name] && <span error-message="">{errorMessage} </span>}
    </>
  )
}

export default FormMultiSelect
