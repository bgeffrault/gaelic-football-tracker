import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/system'

const SuccessfulButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  minWidth: 0,
  borderRadius: '50%',
  padding: '5px 10px ',
})
const MissedButton = styled(Button)({
  backgroundColor: 'rgb(166,166,166)',
  color: 'white',
  border: '1px solid black',
  borderRadius: '20px',
  padding: '5px 20px ',
  marginLeft: '10px',
  textTransform: 'lowercase',
})

type ShootButtonsProps = {
  teamName: string
  totalPoint: number
  totalGoal: number
  totalShoots: number
  teamAccurancy: number
  incrementPoint(): void
  incrementGoal(): void
  incrementMissed(): void
  incrementBlocked(): void
}

const ShootButtons = ({
  teamName,
  totalPoint,
  totalGoal,
  totalShoots,
  teamAccurancy,
  incrementPoint,
  incrementGoal,
  incrementMissed,
  incrementBlocked,
}: ShootButtonsProps): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {teamName}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {`${totalPoint} - ${totalGoal}`}
      </Typography>
      <p style={{ fontSize: '15px' }}>
        {`${totalShoots} accuracy:  ${
          teamAccurancy !== teamAccurancy ? 100 : teamAccurancy
        }%`}
      </p>
      <Box>
        <Box>
          <SuccessfulButton onClick={() => incrementPoint()}>+1</SuccessfulButton>
          <MissedButton onClick={() => incrementMissed()}>Raté</MissedButton>
        </Box>
        <Box>
          <SuccessfulButton
            sx={{ marginTop: '10px' }}
            onClick={() => incrementGoal()}
          >
            +3
          </SuccessfulButton>
          <MissedButton
            sx={{ marginTop: '10px', padding: '5px 10px ' }}
            onClick={() => incrementBlocked()}
          >
            Bloqué
          </MissedButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ShootButtons
