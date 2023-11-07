import { Box, Link, Typography } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Views, Tables } from '../config/supabaseClient'
import { useRouter } from 'next/navigation'

const usedTeamScore: (
  teamGame: Tables<'TeamGame'> & {
    Team: Tables<'Team'>
  },
  TeamScore?: Views<'TeamScore'>[]
) => {
  teamGoal: number
  teamPoint: number
  teamMissed: number
  teamBlocked: number
} = (
  teamGame: Tables<'TeamGame'> & { Team: Tables<'Team'> },
  TeamScore?: Views<'TeamScore'>[]
) => {
  const teamGameId = teamGame?.id

  const teamGoal =
    TeamScore?.filter(
      (teamScore) => teamScore.teamGameId === teamGameId && teamScore.type === 'goal'
    )[0]?.count ?? 0
  const teamPoint =
    TeamScore?.filter(
      (teamScore) =>
        teamScore.teamGameId === teamGameId && teamScore.type === 'point'
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

  return {
    teamGoal,
    teamPoint,
    teamMissed,
    teamBlocked,
  }
}

export type TableScoreGame = Tables<'Game'> & {
  TeamGame: (Tables<'TeamGame'> & { Team: Tables<'Team'> })[]
} & {
  TeamScore: Views<'TeamScore'>[]
}

export type CardsProps = {
  game: TableScoreGame
}

const TableScore = ({ game }: CardsProps): React.JSX.Element | null => {
  const router = useRouter()
  const { TeamGame, gameEnded, TeamScore } = game
  if (TeamGame.length !== 2) {
    console.warn('This game has the wrong of TeamGame', game.id)
    return null
  }

  const isFirstTeamExternal = TeamGame[0].Team.external
  const firstTeamGame = !isFirstTeamExternal ? TeamGame[0] : TeamGame[1]
  const secondTeamGame = isFirstTeamExternal ? TeamGame[0] : TeamGame[1]
  const firstTeamName = firstTeamGame.Team.teamName
  const secondTeamName = secondTeamGame.Team.teamName
  const duration = game.duration

  const {
    teamGoal: firstTeamGoal,
    teamPoint: firstTeamPoint,
    teamMissed: firstTeamMissed,
    teamBlocked: firstTeamBlocked,
  } = usedTeamScore(
    firstTeamGame as Tables<'TeamGame'> & { Team: Tables<'Team'> },
    TeamScore
  )
  const { teamGoal: secondTeamGoal, teamPoint: secondTeamPoint } = usedTeamScore(
    secondTeamGame as Tables<'TeamGame'> & { Team: Tables<'Team'> },
    TeamScore
  )

  const firstTeamScore = firstTeamGoal + firstTeamPoint
  const firstTeamMissedAnsBlocked = firstTeamMissed + firstTeamBlocked
  const secondTeamScore = secondTeamGoal + secondTeamPoint
  const win = firstTeamScore < secondTeamScore
  const firstTeamAccuracy = Math.round(
    (firstTeamScore / (firstTeamScore + firstTeamMissedAnsBlocked)) * 100
  )

  return (
    <Box
      sx={{
        border: '1px solid black',
        borderRadius: '10px',
        padding: '10px',
        height: '100px',
        backgroundColor: !win ? 'rgb(167, 196, 197)' : 'red',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '35%',
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {firstTeamName}
          </Typography>
          <p>
            {`${firstTeamPoint} - ${firstTeamGoal} (${
              firstTeamPoint + firstTeamGoal * 3
            })`}
          </p>
        </Box>
        <p>{`Accuracy: ${!firstTeamAccuracy ? 100 : firstTeamAccuracy}%`}</p>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          {duration}
        </Typography>
        {gameEnded === false ? (
          <Link
            style={{
              textDecoration: 'none',
              color: 'black',
              display: 'flex',
              marginTop: '5px',
              cursor: 'pointer',
            }}
            onClick={() => router.push('/game/' + game.id)}
          >
            <PlayCircleOutlineIcon />
          </Link>
        ) : (
          '-'
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          width: '35%',
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {secondTeamName}
          </Typography>
          <p>
            {`${secondTeamPoint} - ${secondTeamGoal} (${
              secondTeamPoint + secondTeamGoal * 3
            })`}
          </p>
        </Box>
      </Box>
    </Box>
  )
}

export default TableScore
