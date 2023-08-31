import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

type NavigationRoutes = {
    SelectPlayer: {
        gameId: number;
    },
    Game: {
        gameId: number;
    }
    Games: {
        gameId: number;
    },
    Home: undefined;
    NewGame: undefined;
    Members: undefined;
    Login: undefined;
    CreateClub: undefined;
    AddMember: undefined;
}

export type AppRouteProp<T extends keyof NavigationRoutes> = RouteProp<NavigationRoutes, T>;


export type RootNavigation = keyof NavigationRoutes;

export type AppNavigationProp<T extends keyof NavigationRoutes> = NativeStackScreenProps<NavigationRoutes, T> 

type RootNavigationProp = NativeStackNavigationProp<NavigationRoutes> 

export const useAppNavigation = () => {
    return useNavigation<RootNavigationProp>()
}
