import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(209, 130, 73)",
          textAlign: "center",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(246, 243, 243)",
          border: "1px solid rgb(177, 176, 176)",
          borderRadius: "5px",
          margin: "30px",
          "> [error-message]": {
            color: "red",
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          "> .MuiButtonBase-root": {
            width: "100%",
            backgroundColor: "gray",
            color: "white",
            borderRadius: "50px",
            marginTop: "50px",
          },
        },
      },
    },
  },
});

export default theme;
