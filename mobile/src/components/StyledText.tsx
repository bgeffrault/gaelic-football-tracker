import { useFonts } from "expo-font";
import { Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import clsx from "clsx";

SplashScreen.preventAutoHideAsync();

export function StyledText({ children, cn }: { children: React.ReactNode, cn?: string }) {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line global-require
    "Lexend-Regular": require("../../assets/fonts/Lexend-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text
      onLayout={onLayoutRootView}
      className={clsx("font-['Lexend-Regular']", cn)}
    >
      {children}
    </Text>
  );
}
