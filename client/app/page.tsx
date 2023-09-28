'use client'
import { useEffect, useState } from 'react'
import supabase from './config/supabaseClient'
import TableScore, { TableScoreGame } from './components/TableScore'
import Header from './components/molecules/Header'
import Link from 'next/link'

export default function Home(): JSX.Element {
  const [games, setGames] = useState<TableScoreGame[] | null>(null)

  useEffect(() => {
    const fetchMembers = async (): Promise<void> => {
      const { data: games, error } = await supabase
        .from('Game')
        .select('*, TeamGame(*, Team(*))')

      console.log('data: ', games)

      if (error) {
        setGames(null)
        console.log(error)
      }
      if (games) {
        setGames(games as TableScoreGame[])
      }
    }
    fetchMembers()
  }, [])

  return (
    <>
      <Header name="Home" backHome="backHome" />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link style={{ textDecoration: 'none', color: '#000' }} href="/members">
          Découvrez les membres de l&#39;équipe !
        </Link>
      </div>

      <div style={{ padding: '30px' }}>
        <h3 style={{ backgroundColor: 'rgb(209, 130, 73)', marginBottom: '10px' }}>
          In Progress
        </h3>
        {games
          ?.filter((inProgress) => !inProgress.gameEnded)
          .map((game) => <TableScore key={game.id} game={game} />)}
      </div>
      <div style={{ padding: '30px' }}>
        <h3 style={{ backgroundColor: 'rgb(209, 130, 73)', marginBottom: '10px' }}>
          Last Games
        </h3>
        {games
          ?.filter((isEnded) => isEnded.gameEnded)
          .map((game) => <TableScore key={game.id} game={game} />)}
      </div>
    </>
  )
}
