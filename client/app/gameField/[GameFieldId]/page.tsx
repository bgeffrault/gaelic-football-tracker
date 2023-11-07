'use client'
import Image from 'next/image'
import Field from '../../assets/Field.svg'
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import MemberShooter, { TablesGameInProgress } from '@/app/components/MemberShooter'
import supabase, { Tables } from '@/app/config/supabaseClient'
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {
  firstTeamGame: Tables<'TeamGame'> & {
    Team: Tables<'Team'>
  }
}

type Inputs = {
  player: string
  firstName: string
}

export const GameField = ({ firstTeamGame }: Props): JSX.Element => {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])
  const [open, setOpen] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  const [teamGame, setTeamGames] = useState<TablesGameInProgress[] | null>(null)

  useEffect(() => {
    const fetchMembers = async (): Promise<void> => {
      const { data: teamGame, error } = await supabase
        .from('TeamGame')
        .select('*, TeamMembers(*, Members(*))')

      if (error) {
        setTeamGames(null)
        console.error(error)
      }
      if (teamGame) {
        setTeamGames(teamGame as TablesGameInProgress[])
      }
    }
    fetchMembers()
  }, [])

  const gameInProgress = teamGame?.find(
    (game) => game?.teamId === firstTeamGame?.teamId
  )

  const handleOnClick = (event: React.MouseEvent<HTMLElement>): void => {
    const { clientX, clientY } = event
    const { left, top } = event.currentTarget.getBoundingClientRect()
    const x = clientX - left
    const y = clientY - top

    setOpen(true)
    setPoints((prevPoints) => [...prevPoints, { x, y }])
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  const { register, control, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setOpen(false)
    console.log(data)
  }

  return (
    <>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box position={'relative'}>
          <Image
            src={Field}
            width="400"
            alt="Picture of the author"
            onClick={handleOnClick}
            ref={imageRef}
          />
          {points.map((position, index) => (
            <Box
              key={index}
              position={'absolute'}
              left={position.x}
              top={position.y}
              width={15}
              height={15}
              sx={{
                backgroundColor: 'red',
                transform: 'translateX(-50%) translateY(-50%)',
              }}
              borderRadius="50%"
            >
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Scorer</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <MemberShooter
                    gameInProgress={gameInProgress!}
                    register={register}
                    name="player"
                    control={control}
                    errorMessage="Selectionner le joueur"
                    label="Joueur *"
                  />
                  <DialogActions>
                    <Button type="submit">Valider</Button>
                  </DialogActions>
                </form>
              </Dialog>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}
export default GameField
