'use client'
import Image from 'next/image'
import Field from '../../assets/Field.svg'
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { Dispatch, Key, SetStateAction, useEffect, useRef, useState } from 'react'
import MemberShooter, { TablesGameInProgress } from '@/app/components/MemberShooter'
import supabase, { Tables } from '@/app/config/supabaseClient'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addShoot, getShoot } from '@/app/actions/shoot.action'
import { Theme } from '@mui/system'
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'
import { Property } from 'csstype'
import { AppDispatch, RootState } from '@/app/layout'

type GameFieldProps = {
  teamGame: Tables<'TeamGame'> & {
    Team: Tables<'Team'>
  }
  addingShoot: {
    type: string
    teamId: number
  } | null
  setAddingShoot: Dispatch<
    SetStateAction<{
      type: string
      teamId: number
    } | null>
  >
  id: number
  teamGameId: number | undefined
}

type Inputs = {
  player: number
}

export const GameField = ({
  teamGame,
  addingShoot,
  setAddingShoot,
  id,
  teamGameId,
}: GameFieldProps): JSX.Element => {
  const [points, setPoints] = useState<{ x: number; y: number; type: string }[]>([])
  const [open, setOpen] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const [teamGames, setTeamGames] = useState<TablesGameInProgress[] | null>(null)
  const dispatch: AppDispatch = useDispatch()
  const { register, control, reset, handleSubmit } = useForm<Inputs>()
  const gameInProgress = teamGames?.find((game) => game?.teamId === teamGame?.teamId)
  const addPoints = useSelector((state: RootState) => state.shootReducer)
  const shootsField = addPoints.filter(
    (e: { teamGameId: number | undefined }) => e.teamGameId === teamGameId
  )

  useEffect(() => {
    const fetchMembers = async (): Promise<void> => {
      const { data: teamGames, error } = await supabase
        .from('TeamGame')
        .select('*, TeamMembers(*, Members(*))')

      if (error) {
        setTeamGames(null)
        console.error(error)
      }
      if (teamGames) {
        setTeamGames(teamGames as TablesGameInProgress[])
      }
    }
    fetchMembers()
    dispatch(getShoot())
  }, [dispatch])

  const handleOnClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (addingShoot === null) {
      return
    }
    const { clientX, clientY } = event
    const { left, top } = event.currentTarget.getBoundingClientRect()
    const x = clientX - left
    const y = clientY - top

    setOpen(true)
    setPoints((prevPoints) => [...prevPoints, { x, y, type: addingShoot.type }])
    setAddingShoot(null)
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setOpen(false)
    const point = points[points.length - 1]
    const playerId = Number(data.player)

    const postData = !playerId
      ? {
          x: Math.round(point.x),
          y: Math.round(point.y),
          type: point.type,
          teamGameId: teamGameId,
        }
      : {
          x: Math.round(point.x),
          y: Math.round(point.y),
          memberId: Number(playerId),
          type: point.type,
          teamGameId: teamGameId,
        }

    dispatch(addShoot(postData))
  }

  return (
    <>
      {id === 1 ? (
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

              {shootsField.map(
                (
                  position: {
                    x:
                      | ResponsiveStyleValue<
                          | Property.Left<string | number>
                          | NonNullable<Property.Left<string | number> | undefined>[]
                          | undefined
                        >
                      | ((
                          theme: Theme
                        ) => ResponsiveStyleValue<
                          | Property.Left<string | number>
                          | NonNullable<Property.Left<string | number> | undefined>[]
                          | undefined
                        >)
                    y:
                      | ResponsiveStyleValue<
                          | Property.Top<string | number>
                          | NonNullable<Property.Top<string | number> | undefined>[]
                          | undefined
                        >
                      | ((
                          theme: Theme
                        ) => ResponsiveStyleValue<
                          | Property.Top<string | number>
                          | NonNullable<Property.Top<string | number> | undefined>[]
                          | undefined
                        >)
                    type: string
                  },
                  index: Key | null | undefined
                ) => (
                  <Box
                    key={index}
                    position={'absolute'}
                    left={position.x}
                    top={position.y}
                    width={15}
                    height={15}
                    sx={{
                      backgroundColor:
                        position.type === 'point'
                          ? '#98e2bd'
                          : position.type === 'goal'
                          ? '#6b9fbf'
                          : position.type === 'missed'
                          ? '#a67b11'
                          : '#c14a4e',
                      transform: 'translateX(-50%) translateY(-50%)',
                    }}
                    borderRadius="50%"
                  ></Box>
                )
              )}
              <Dialog open={open}>
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
                    <Button type="submit" onClick={() => reset()}>
                      Valider
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </Box>
          </Box>
        </>
      ) : (
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

              {shootsField.map(
                (
                  position: {
                    x:
                      | ResponsiveStyleValue<
                          | Property.Left<string | number>
                          | NonNullable<Property.Left<string | number> | undefined>[]
                          | undefined
                        >
                      | ((
                          theme: Theme
                        ) => ResponsiveStyleValue<
                          | Property.Left<string | number>
                          | NonNullable<Property.Left<string | number> | undefined>[]
                          | undefined
                        >)
                    y:
                      | ResponsiveStyleValue<
                          | Property.Top<string | number>
                          | NonNullable<Property.Top<string | number> | undefined>[]
                          | undefined
                        >
                      | ((
                          theme: Theme
                        ) => ResponsiveStyleValue<
                          | Property.Top<string | number>
                          | NonNullable<Property.Top<string | number> | undefined>[]
                          | undefined
                        >)
                    type: string
                  },
                  index: Key | null | undefined
                ) => (
                  <Box
                    key={index}
                    position={'absolute'}
                    left={position.x}
                    top={position.y}
                    width={15}
                    height={15}
                    sx={{
                      backgroundColor:
                        position.type === 'point'
                          ? '#98e2bd'
                          : position.type === 'goal'
                          ? '#6b9fbf'
                          : position.type === 'missed'
                          ? '#a67b11'
                          : '#c14a4e',
                      transform: 'translateX(-50%) translateY(-50%)',
                    }}
                    borderRadius="50%"
                  ></Box>
                )
              )}
              <Dialog open={open}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Button
                    sx={{ color: 'black', fontWeight: 'bold' }}
                    type="submit"
                    onClick={() => reset()}
                  >
                    Valider
                  </Button>
                </form>
              </Dialog>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}
export default GameField
