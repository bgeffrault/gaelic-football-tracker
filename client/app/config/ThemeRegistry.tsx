"use client";
import { ThemeProvider } from "@mui/material/styles";
import NextAppProvider from "./EmotionCache";
import { CssBaseline } from "@mui/material";
import theme from "../theme/theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </NextAppProvider>
  );
}
