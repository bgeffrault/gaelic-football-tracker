import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./src/screens/Home/Home";
import {
  EditGameIconButton,
  GameScreen,
} from "./src/screens/GameScreen/GameScreen";
import { Members } from "./src/screens/Members";
import { AddMember } from "./src/screens/AddMember";
import { AddGame } from "./src/screens/AddGame";
import { store } from "./src/stores/store";
import { SelectPlayer } from "./src/screens/SelectPlayer";
import { ClubIdProvider } from "./src/providers/ClubIdProvider";
import { ClubConfig } from "./src/screens/ClubConfig/ClubConfig";
import { Categories } from "./src/screens/Categories";
import { Teams } from "./src/screens/Teams";
import { SupabaseClientProvider } from "./src/providers/useSupabaseClient";
import { Player } from "./src/screens/Player";
import { EditGame } from "./src/screens/EditGame";
import { GoHomeButton } from "./src/components/GoHomeButton";
import { gameResultGradientColors } from "./src/utils/shootsUtils";
import { NavigationRoutes } from "./src/navigators";

const Stack = createNativeStackNavigator<NavigationRoutes>();
const queryClient = new QueryClient();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerTintColor: "#1F2937",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  contentStyle: {
    backgroundColor: "#F3F4F6",
  },
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseClientProvider>
        <Provider store={store}>
          <ClubIdProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={defaultScreenOptions}
                initialRouteName="Home"
              >
                <Stack.Group>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Members" component={Members} />
                  <Stack.Screen
                    name="NewGame"
                    component={AddGame}
                    options={{
                      headerTitle: "New game",
                      headerLeft: GoHomeButton,
                    }}
                  />
                  <Stack.Screen name="EditGame" component={EditGame} />
                  <Stack.Screen
                    name="Game"
                    component={GameScreen}
                    options={({
                      route: {
                        params: { gameResult },
                      },
                    }) => ({
                      headerTitle: gameResult.name,
                      // eslint-disable-next-line react/no-unstable-nested-components
                      headerLeft: GoHomeButton,
                      headerRight: EditGameIconButton,
                      headerStyle: {
                        backgroundColor:
                          gameResultGradientColors[gameResult.outcome][
                            gameResult.outcome === "win" ? 0 : 1
                          ],
                      },
                    })}
                  />
                  <Stack.Screen name="ClubConfig" component={ClubConfig} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                  <Stack.Screen name="AddMember" component={AddMember} />
                  <Stack.Screen name="SelectPlayer" component={SelectPlayer} />
                  <Stack.Screen name="SelectMembers" component={Members} />
                  <Stack.Screen name="Categories" component={Categories} />
                  <Stack.Screen name="Teams" component={Teams} />
                  <Stack.Screen name="Player" component={Player} />
                </Stack.Group>
              </Stack.Navigator>
            </NavigationContainer>
          </ClubIdProvider>
        </Provider>
      </SupabaseClientProvider>
    </QueryClientProvider>
  );
}
