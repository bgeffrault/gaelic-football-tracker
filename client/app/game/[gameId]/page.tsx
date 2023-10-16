'use client'
import { Box } from '@mui/material'
import Header from '@/app/components/molecules/Header'
import { useEffect, useState } from 'react'
import supabase, { Tables, Views } from '../../config/supabaseClient'
import ShootButtons from '@/app/components/ShootButtons'
import GameField from '@/app/gameField/[GameFieldId]/page'

type Params = {
  params: {
    gameId: number
  }
}

const useTeamScore = (
  teamGame: Tables<'TeamGame'> & { Team: Tables<'Team'> },
  TeamScore?: Views<'TeamScore'>[]
): {
  teamTotalPoint: number
  teamTotalGoal: number
  teamTotalShoots: number
  teamAccuracy: number
  teamIncrementPoint: () => void
  teamIncrementGoal: () => void
  teamIncrementMissed: () => void
  teamIncrementBlocked: () => void
} => {
  const [teamAddPoint, setTeamAddPoint] = useState(0)
  const [teamAddGoal, setTeamAddGoal] = useState(0)
  const [teamAddMissed, setTeamAddMissed] = useState(0)
  const [teamAddBlocked, setTeamAddBlocked] = useState(0)

  const teamIncrementPoint = (): void =>
    setTeamAddPoint((prevNumber) => prevNumber + 1)
  const teamIncrementGoal = (): void =>
    setTeamAddGoal((prevNumber) => prevNumber + 1)
  const teamIncrementMissed = (): void =>
    setTeamAddMissed((prevNumber) => prevNumber + 1)
  const teamIncrementBlocked = (): void =>
    setTeamAddBlocked((prevNumber) => prevNumber + 1)

  const teamGameId = teamGame?.id

  const teamPoint =
    TeamScore?.filter(
      (teamScore) =>
        teamScore.teamGameId === teamGameId && teamScore.type === 'point'
    )[0]?.count ?? 0
  const teamGoal =
    TeamScore?.filter(
      (teamScore) => teamScore.teamGameId === teamGameId && teamScore.type === 'goal'
    )[0]?.count ?? 0
  const teamMissed =
    TeamScore?.filter(
      (teamScore) =>
        teamScore.teamGameId === teamGameId && teamScore.type === 'missed'
    )[0]?.count ?? 0
  const teamBlocked =
    TeamScore?.filter(
      (teamScore) =>
        teamScore.teamGameId === teamGameId && teamScore.type === 'blocked'
    )[0]?.count ?? 0

  const teamTotalPoint = teamPoint + teamAddPoint
  const teamTotalGoal = teamGoal + teamAddGoal
  const teamGoalMissed = teamMissed + teamAddMissed
  const teamToalBlocked = teamBlocked + teamAddBlocked
  const teamPointAndGoal = teamTotalPoint + teamTotalGoal
  const teamMissedAndBlocked = teamGoalMissed + teamToalBlocked
  const teamTotalShoots = teamPointAndGoal + teamMissedAndBlocked
  const teamAccuracy = Math.round(
    (teamPointAndGoal / (teamPointAndGoal + teamMissedAndBlocked)) * 100
  )
  return {
    teamTotalPoint,
    teamTotalGoal,
    teamTotalShoots,
    teamAccuracy,
    teamIncrementPoint,
    teamIncrementGoal,
    teamIncrementMissed,
    teamIncrementBlocked,
  }
}

export type TableScoreGame = Tables<'Game'> & {
  TeamGame: (Tables<'TeamGame'> & { Team: Tables<'Team'> })[]
} & {
  TeamScore: Views<'TeamScore'>[]
}

export const Game = ({ params: { gameId } }: Params): JSX.Element => {
  const [fetchError, setFetchError] = useState<string | null>('')
  const [games, setGames] = useState<TableScoreGame[] | null>(null)

  useEffect(() => {
    const fetchMembers = async (): Promise<void> => {
      const { data: games, error } = await supabase
        .from('Game')
        .select('*, TeamGame(*, Team(*)), TeamScore(*)')
        .eq('id', gameId)
      if (error) {
        setGames(null)
        setFetchError('Could not fetch the games')
        console.error(error)
      }
      if (games) {
        setGames(games as TableScoreGame[])
        setFetchError(null)
      }
    }
    fetchMembers()
  }, [gameId])

  const gameInProgress = games?.find((game) => game.id !== gameId)

  const isFirstTeamExternal = gameInProgress?.TeamGame[0].Team.external
  const firstTeamGame = !isFirstTeamExternal
    ? gameInProgress?.TeamGame[0]
    : gameInProgress?.TeamGame[1]
  const secondTeamGame = isFirstTeamExternal
    ? gameInProgress?.TeamGame[0]
    : gameInProgress?.TeamGame[1]
  const firstTeamName = firstTeamGame?.Team.teamName
  const secondTeamName = secondTeamGame?.Team.teamName
  const duration = gameInProgress?.duration
  const TeamScore = gameInProgress?.TeamScore

  const {
    teamTotalPoint: firstTeamTotalPoint,
    teamTotalGoal: firstTeamTotalGoal,
    teamTotalShoots: firstTeamTotalShoots,
    teamAccuracy: firstTeamAccuracy,
    teamIncrementPoint: firstTeamIncrementPoint,
    teamIncrementGoal: firstTeamIncrementGoal,
    teamIncrementMissed: firstTeamIncrementMissed,
    teamIncrementBlocked: firstTeamIncrementBlocked,
  } = useTeamScore(
    firstTeamGame as Tables<'TeamGame'> & { Team: Tables<'Team'> },
    TeamScore
  )
  const {
    teamTotalPoint: secondTeamTotalPoint,
    teamTotalGoal: secondTeamTotalGoal,
    teamTotalShoots: secondTeamTotalShoots,
    teamAccuracy: secondTeamAccuracy,
    teamIncrementPoint: secondTeamIncrementPoint,
    teamIncrementGoal: secondTeamIncrementGoal,
    teamIncrementMissed: secondTeamIncrementMissed,
    teamIncrementBlocked: secondTeamIncrementBlocked,
  } = useTeamScore(
    secondTeamGame as Tables<'TeamGame'> & { Team: Tables<'Team'> },
    TeamScore
  )

  if (fetchError) {
    return <Header name={fetchError} backHome={'game'} />
  }
  return (
    <>
      <Header name={`${firstTeamName} vs ${secondTeamName}`} backHome={'game'} />
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <GameField firstTeamGame={firstTeamGame!} />
        <Box
          sx={{
            backgroundColor: 'rgb(167, 196, 197)',
            border: '1px solid black',
            borderRadius: '5px',
            marginTop: '20px',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: '30%',
          }}
        >
          <ShootButtons
            teamName={firstTeamName as string}
            totalPoint={firstTeamTotalPoint}
            totalGoal={firstTeamTotalGoal}
            totalShoots={firstTeamTotalShoots}
            teamAccurancy={firstTeamAccuracy}
            incrementPoint={firstTeamIncrementPoint}
            incrementGoal={firstTeamIncrementGoal}
            incrementMissed={firstTeamIncrementMissed}
            incrementBlocked={firstTeamIncrementBlocked}
          />
          <p
            style={{
              textDecoration: 'underline',
              padding: '0 20px',
              fontWeight: 'bold',
            }}
          >{`${duration}'`}</p>
          <ShootButtons
            teamName={secondTeamName as string}
            totalPoint={secondTeamTotalPoint}
            totalGoal={secondTeamTotalGoal}
            totalShoots={secondTeamTotalShoots}
            teamAccurancy={secondTeamAccuracy}
            incrementPoint={secondTeamIncrementPoint}
            incrementGoal={secondTeamIncrementGoal}
            incrementMissed={secondTeamIncrementMissed}
            incrementBlocked={secondTeamIncrementBlocked}
          />
        </Box>
      </Box>
    </>
  )
}
export default Game
