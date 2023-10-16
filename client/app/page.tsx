'use client'
import { useEffect, useState } from 'react'
import supabase from './config/supabaseClient'
import TableScore, { TableScoreGame } from './components/TableScore'
import Header from './components/molecules/Header'
import Link from 'next/link'
import { styled } from '@mui/system'
import PeopleIcon from '@mui/icons-material/People'
import { Box } from '@mui/material'

const Title = styled('h3')({
  backgroundColor: 'rgb(209, 130, 73)',
  marginBottom: '10px',
})
const Div = styled('div')({
  padding: '30px',
})

export default function Home(): JSX.Element {
  const [fetchError, setFetchError] = useState<string | null>('')
  const [games, setGames] = useState<TableScoreGame[] | null>(null)

  useEffect(() => {
    const fetchMembers = async (): Promise<void> => {
      const { data: games, error } = await supabase
        .from('Game')
        .select('*, TeamGame(*, Team(*)), TeamScore(*)')

      if (error) {
        setGames(null)
        setFetchError('Could not fetch the games')
        console.error(error)
      }
      if (games) {
        setGames(games as unknown as TableScoreGame[])
      }
    }
    fetchMembers()
  }, [])

  return (
    <>
      <Header name="Home" backHome="backHome" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Link
          style={{
            textDecoration: 'none',
            color: '#000',
          }}
          href="/members"
        >
          Découvrez les membres de l&#39;équipe ! <br />
          <PeopleIcon sx={{ width: '100%' }} />
        </Link>
      </Box>
      <Div>
        <Title>In Progress</Title>
        <div>{fetchError && <p>{fetchError} </p>}</div>
        {games
          ?.filter((inProgress) => !inProgress.gameEnded)
          .map((game) => <TableScore key={game.id} game={game} />)}
      </Div>
      <Div>
        <Title>Last Games</Title>
        <div>{fetchError && <p>{fetchError} </p>}</div>
        {games
          ?.filter((isEnded) => isEnded.gameEnded)
          .map((game) => <TableScore key={game.id} game={game} />)}
      </Div>
    </>
  )
}
