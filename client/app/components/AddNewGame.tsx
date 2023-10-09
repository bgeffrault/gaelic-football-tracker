'use client'
import * as React from 'react'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FormField from './FormField'
import { SubmitHandler, useForm } from 'react-hook-form'
import supabase, { Tables } from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FormMultiSelect from './FormMultiSelect'
import FormSelect from './FormSelect'

type Inputs = {
  externalTeamName: string
  homeTeamName: string
  duration: number
  GameName: string
  TeamMembers: number[]
  date: string
}

export default function AddNewGame(): React.JSX.Element {
  const [membersName, setMembersName] = useState<string[]>([])
  const [members, setMembers] = useState<Tables<'Members'>[] | null>(null)
  const [teams, setTeams] = useState<Tables<'Team'>[] | null>(null)
  const [open, setOpen] = useState(false)
  const { register, control, handleSubmit } = useForm<Inputs>()
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }
  const today = dayjs()

  useEffect(() => {
    const fetchMembers = async (): Promise<void> => {
      const { data: members, error } = await supabase.from('Members').select('*')
      const { data: teams } = await supabase.from('Team').select('*')
      if (error) {
        setMembers(null)
        setTeams(null)
        console.error(error)
      }
      if (members) {
        setMembers(members as Tables<'Members'>[])
      }
      if (teams) {
        setTeams(teams)
      }
    }
    fetchMembers()
  }, [])

  const handleSelectedMembersChange = (
    event: SelectChangeEvent<typeof membersName>
  ): void => {
    const {
      target: { value },
    } = event
    setMembersName(typeof value === 'string' ? value.split(',') : value)
  }

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const gameResponse = await supabase
      .from('Game')
      .insert({
        date: data.date,
        duration: data.duration,
        name: data.GameName,
        gameEnded: false,
        clubId: 1,
      })
      .select('id')
    const gameId = gameResponse.data?.[0]?.id
    if (gameId === null) {
      return
    }
    const internalTeamId = data.homeTeamName
    const externalTeamId = data.externalTeamName
    const teamGameResponse = await supabase
      .from('TeamGame')
      .insert([
        {
          teamId: Number(internalTeamId),
          gameId: Number(gameId),
        },
        {
          teamId: Number(externalTeamId),
          gameId: Number(gameId),
        },
      ])
      .select('*')
    const teamGameId = teamGameResponse.data?.find(
      (teamGame) => teamGame.teamId === Number(internalTeamId)
    )?.id
    if (teamGameId === null) {
      return
    }
    await supabase.from('TeamMembers').insert(
      data.TeamMembers.map((teamMemberId) => ({
        memberId: teamMemberId,
        teamGameId: Number(teamGameId),
      }))
    )
    setOpen(false)
    window.location.href = '/game'
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          sx={{ textDecoration: 'none', color: 'black' }}
          onClick={handleClickOpen}
        >
          <AddCircleOutlineIcon />
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un match</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <FormSelect
              label="Nom de l'équipe adverse *"
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              name="externalTeamName"
              register={register}
              errorMessage="Le nom de l'équipe est requis"
              margin="dense"
              defaultValue=""
              control={control}
            >
              {teams
                ?.filter((team) => team.external)
                .map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.teamName}
                  </MenuItem>
                ))}
            </FormSelect>
            <FormSelect
              label="Nom de l'équipe à domicile *"
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              name="homeTeamName"
              register={register}
              errorMessage="Le nom de l'équipe est requis"
              margin="dense"
              defaultValue=""
              control={control}
            >
              {teams
                ?.filter((team) => !team.external)
                .map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.teamName}
                  </MenuItem>
                ))}
            </FormSelect>
            <FormField
              label="Durée du match *"
              placeholder="60"
              margin="dense"
              id="duration"
              type="text"
              register={register}
              control={control}
              isRequired={true}
              name="duration"
              errorMessage="La durée est requise"
            />

            <FormMultiSelect
              register={register}
              control={control}
              label="Joueurs *"
              id="demo-multiple-checkbox-label"
              value={membersName}
              onChange={handleSelectedMembersChange}
              renderValue={(selected) => selected.length}
              MenuProps={MenuProps}
              name="TeamMembers"
              errorMessage="Plusieurs joueurs sont requis"
            >
              {members?.map((member) => (
                <MenuItem key={member.id} value={`${member.id} `}>
                  <Checkbox checked={membersName.indexOf(`${member.id} `) > -1} />

                  {`${member.firstName} ${member.lastName} `}
                </MenuItem>
              ))}
            </FormMultiSelect>
            <FormField
              label="Compétition"
              placeholder="Coupe de Bretagne"
              margin="dense"
              id="GameName"
              type="text"
              register={register}
              control={control}
              isRequired={false}
              name="GameName"
              errorMessage=""
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: '100%', marginTop: '8px' }}
                views={['year', 'month', 'day']}
                defaultValue={today}
                {...(register('date'), { required: true })}
              />
            </LocalizationProvider>
            <DialogActions>
              <Button type="submit">C&#39;est parti !!</Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}
