import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { Home } from "./src/screens/Home";
// import { Login } from "./src/screens/Login";
import { GameScreen } from "./src/screens/GameScreen/GameScreen";
import { CreateClub } from "./src/screens/CreateClub";
import { Members } from "./src/screens/Members";
import { AddMember } from "./src/screens/AddMember";
import { AddGame } from "./src/screens/AddGame";
import { store } from "./src/stores/store";
import { SelectPlayer } from "./src/screens/SelectPlayer";

const Stack = createNativeStackNavigator();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#df8c5f",
  },
  headerTintColor: "#000",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  contentStyle: {
    backgroundColor: "#FAFAFA",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={defaultScreenOptions}
          initialRouteName="Home"
        >
          <Stack.Group>
            {/* <Stack.Screen name="Login" component={Login} /> */}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CreateClub" component={CreateClub} />
            <Stack.Screen name="Members" component={Members} />
            <Stack.Screen name="NewGame" component={AddGame} />
            <Stack.Screen name="Game" component={GameScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="AddMember" component={AddMember} />
            <Stack.Screen name="SelectPlayer" component={SelectPlayer} />
            <Stack.Screen name="MembersModal" component={Members} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
