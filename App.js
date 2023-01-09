import { StatusBar } from "expo-status-bar";
import { useLayoutEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  Animated,
  View,
  PanResponder,
} from "react-native";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FieldZone } from "./src/Components/FielZone";
import field from "./assets/field.png";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-orange-200 flex-1">
      <View className="flex-1 bg-white">
        <FieldZone src={field} />
      </View>
      {/* <Image
          source={field}
          className="w-full aspect-square bg-green-600 opacity-80"
          style={{
            height: undefined,
          }}
          resizeMode="contain"
          onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            console.log("x, y, width, height ", { x, y, width, height });
          }}
        /> */}
    </SafeAreaView>
  );
}
