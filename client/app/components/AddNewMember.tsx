'use client'
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Box, MenuItem } from '@mui/material'
import supabase, { Tables } from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormField from './FormField'
import FormSelect from './FormSelect'

type Inputs = {
  firstName: string
  lastName: string
  pseudo: string
  categoryId: number
  clubId: number
}

export default function AddNewMember(): React.JSX.Element {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<Tables<'Category'>[] | null>(null)
  const [clubs, setClubs] = useState<Tables<'Club'>[] | null>(null)

  const handleClickOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }

  useEffect(() => {
    const fetchCategory = async (): Promise<void> => {
      const { data: categories, error } = await supabase.from('Category').select('*')
      const { data: clubs } = await supabase.from('Club').select('*')
      if (error) {
        setCategories(null)
        setClubs(null)
        console.error(error)
      }
      if (categories) {
        setCategories(categories)
      }
      if (clubs) {
        setClubs(clubs)
      }
    }
    fetchCategory()
  }, [])

  const { register, control, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await supabase.from('Members').insert({
      firstName: data.firstName,
      lastName: data.lastName,
      categoryId: data.categoryId,
      clubId: data.clubId,
      pseudo: data.pseudo,
    })

    setOpen(false)
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
          <PersonAddAltIcon />
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
              control={control}
              isRequired={true}
              name="firstName"
              errorMessage="Le Prénom est requis"
            />
            <FormField
              label="Nom *"
              placeholder="Dupont"
              margin="dense"
              id="lastName"
              type="text"
              register={register}
              control={control}
              isRequired={true}
              name="lastName"
              errorMessage="Le Nom est requis"
            />
            <FormSelect
              register={register}
              control={control}
              name="categoryId"
              errorMessage="La Catégorie est requise"
              id="demo-simple-select-label"
              labelId="demo-simple-select-label"
              label="Category *"
              margin="dense"
              defaultValue=""
            >
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </FormSelect>
            <FormSelect
              register={register}
              control={control}
              name="clubId"
              errorMessage="Le Club est requis"
              id="demo-simple-select-label"
              labelId="demo-simple-select-label"
              label="Club *"
              margin="dense"
              defaultValue=""
            >
              {clubs?.map((club) => (
                <MenuItem key={club.id} value={club.id}>
                  {club.name}
                </MenuItem>
              ))}
            </FormSelect>
            <FormField
              label="Pseudo"
              placeholder="JD"
              margin="dense"
              id="pseudo"
              type="text"
              register={register}
              control={control}
              isRequired={false}
              name="pseudo"
              errorMessage=""
            />
            <DialogActions>
              <Button type="submit">Ajouter</Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}
