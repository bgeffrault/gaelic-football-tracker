import { useFonts } from "expo-font";
import { Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import clsx from "clsx";

SplashScreen.preventAutoHideAsync();

export function StyledText({
  children,
  cn,
}: {
  children: React.ReactNode;
  cn?: string;
}) {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment
    "Lexend-Regular": require("../../assets/fonts/Lexend-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text
      onLayout={onLayoutRootView}
      className={clsx("font-['Lexend-Regular'] text-gray-600", cn)}
    >
      {children}
    </Text>
  );
}
