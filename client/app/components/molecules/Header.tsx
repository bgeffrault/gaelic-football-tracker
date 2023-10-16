import React, { ReactNode } from 'react'
import { styled } from '@mui/system'
import Link from 'next/link'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import AddNewGame from '../AddNewGame'
import AddNewMember from '../AddNewMember'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { paletteTheme } from '../../theme/paleteTheme'
import { Typography } from '@mui/material'

export interface HeaderProps {
  name: ReactNode
  backHome: string
}

const Box = styled('div')({
  backgroundColor: paletteTheme.palette.primary,
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '30px',
})

const Div = styled('div')({
  position: 'absolute',
  right: '0',
  padding: '6px',
})

const Header = ({ name, backHome }: HeaderProps): React.JSX.Element => {
  if (backHome === 'backHome') {
    return (
      <>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', margin: '5px 0' }}>
            {name}
          </Typography>
          <Div>
            <AddNewGame />
          </Div>
        </Box>
      </>
    )
  }
  if (backHome === 'game') {
    return (
      <>
        <Box>
          <Div
            sx={{
              left: '0',
            }}
          >
            <Link
              style={{
                textDecoration: 'none',
                color: 'black',
                display: 'flex',
                margin: '5px 0',
              }}
              href="/"
            >
              <HomeOutlinedIcon />
            </Link>
          </Div>
          <Typography variant="h4" sx={{ fontWeight: 'bold', margin: '5px 0' }}>
            {name}
          </Typography>
        </Box>
      </>
    )
  } else {
    return (
      <>
        <Box
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              margin: 'auto 0 ',
            }}
          >
            <KeyboardArrowLeftIcon />
            <Link
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
              href="/"
            >
              Home
            </Link>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', margin: '5px 0' }}>
            {name}
          </Typography>
          <AddNewMember />
        </Box>
      </>
    )
  }
}

export default Header
