import React from 'react'
import { Box } from '@mui/material'
import Link from 'next/link'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import CreateGameDialog from '../AddNewGame'
import AddNewMember from '../AddNewMember'

export interface HeaderProps {
  name: string
  backHome: string
}

const Header = ({ name, backHome }: HeaderProps): React.JSX.Element => {
  return backHome !== 'backHome' ? (
    <>
      <Box
        sx={{
          backgroundColor: 'rgb(209, 130, 73)',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '30px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <KeyboardArrowLeftIcon />
          <Link style={{ textDecoration: 'none', color: 'black' }} href="/">
            Home
          </Link>
        </div>
        <h1>{name}</h1>
        <AddNewMember />
      </Box>
    </>
  ) : (
    <>
      <Box
        sx={{
          backgroundColor: 'rgb(209, 130, 73)',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
        }}
      >
        <h1 style={{ margin: 'auto' }}>{name}</h1>
        <CreateGameDialog />
      </Box>
    </>
  )
}

export default Header
