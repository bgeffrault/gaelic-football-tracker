'use client'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import * as React from 'react'

import {
  Control,
  FieldValues,
  Path,
  UseFormRegister,
  useFormState,
} from 'react-hook-form'
import { Tables } from '../config/supabaseClient'

export type TablesGameInProgress = Tables<'TeamGame'> & {
  TeamMembers: (Tables<'TeamMembers'> & {
    Members: Tables<'Members'>
  })[]
}

export type Props<T extends FieldValues> = {
  gameInProgress: TablesGameInProgress
  register: UseFormRegister<T>
  name: Path<T>
  control: Control<T>
  errorMessage: string
  label: string
}

const MemberShooter = <T extends FieldValues>({
  gameInProgress,
  register,
  name,
  control,
  errorMessage,
  label,
}: Props<T>): React.JSX.Element => {
  const { TeamMembers } = gameInProgress
  const { isDirty, errors } = useFormState({ control })

  return (
    <>
      <FormControl sx={{ m: 6, minWidth: 220, maxWidth: 300 }}>
        <InputLabel> {label} </InputLabel>
        <Select
          defaultValue=""
          label={label}
          {...register(name, {
            required: true,
          })}
        >
          {TeamMembers.map((teamMember) => (
            <MenuItem key={teamMember.id} value={teamMember.Members.firstName}>
              {teamMember.Members.firstName} {teamMember.Members.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!isDirty
        ? errors[name] && <span error-message="">{errorMessage} </span>
        : null}
    </>
  )
}

export default MemberShooter
