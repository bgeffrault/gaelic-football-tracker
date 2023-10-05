import React, { useContext, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { Home } from "./src/screens/Home/Home";
import { GameScreen } from "./src/screens/GameScreen/GameScreen";
import { Members } from "./src/screens/Members";
import { AddMember } from "./src/screens/AddMember";
import { AddGame } from "./src/screens/AddGame";
import { store } from "./src/stores/store";
import { SelectPlayer } from "./src/screens/SelectPlayer";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClubIdProvider } from './src/providers/ClubIdProvider';
import { ClubConfig } from './src/screens/ClubConfig/ClubConfig';
import { Categories } from './src/screens/Categories';
import { Teams } from './src/screens/Teams';
import { SupabaseClientProvider } from './src/providers/useSupabaseClient';

const Stack = createNativeStackNavigator();
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
                  <Stack.Screen name="NewGame" component={AddGame} />
                  <Stack.Screen name="Game" component={GameScreen} />
                  <Stack.Screen name="ClubConfig" component={ClubConfig} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                  <Stack.Screen name="AddMember" component={AddMember} />
                  <Stack.Screen name="SelectPlayer" component={SelectPlayer} />
                  <Stack.Screen name="MembersModal" component={Members} />
                  <Stack.Screen name="Categories" component={Categories} />
                  <Stack.Screen name="Teams" component={Teams} />
                </Stack.Group>
              </Stack.Navigator>
            </NavigationContainer>
          </ClubIdProvider>
        </Provider>
      </SupabaseClientProvider>
    </QueryClientProvider>
  );
}
