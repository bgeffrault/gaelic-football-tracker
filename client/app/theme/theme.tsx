import { createTheme } from '@mui/material/styles'
import { paletteTheme } from './paleteTheme'

const theme = createTheme({
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: paletteTheme.palette.primary,
          textAlign: 'center',
        },
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: paletteTheme.palette.background.ligthGrey,
          border: '1px solid rgb(177, 176, 176)',
          borderRadius: '5px',
          margin: '30px',
          '> [error-message]': {
            color: 'red',
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          '> .MuiButtonBase-root': {
            width: '100%',
            backgroundColor: 'gray',
            color: 'white',
            borderRadius: '50px',
            marginTop: '50px',
          },
        },
      },
    },
  },
})

export default theme
