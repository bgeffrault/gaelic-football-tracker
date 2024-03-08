import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { GameResultByTeam } from "./screens/Home/GameSection";

export type NavigationRoutes = {
    SelectPlayer: {
        teamGameId: number;
    },
    Player: {
        playerId: number;
    },
    Game: {
        gameResult: GameResultByTeam;
        isOpponentTeamSelected: boolean;
    }
    Games: undefined,
    Home: undefined;
    NewGame: undefined;
    Members: undefined | {
        mode?: "select";
        categoryId: number;
    };
    SelectMembers: {
        mode?: "select";
        categoryId: number;
    };
    ClubConfig: undefined;
    Categories: {
        mode?: "select";
    };
    Teams: {
        mode?: "select";
        categoryId: number;
        external: boolean;
    };
    Login: undefined;
    CreateClub: undefined;
    AddMember: {
        categoryId: number;
    };
    AddGame: undefined;
    EditGame: { gameId: number };
}

export type AppRouteProp<T extends keyof NavigationRoutes> = RouteProp<NavigationRoutes, T>;


export type RootNavigation = keyof NavigationRoutes;

export type AppNavigationProp<T extends keyof NavigationRoutes> = NativeStackScreenProps<NavigationRoutes, T>

type RootNavigationProp = NativeStackNavigationProp<NavigationRoutes>

export const useAppNavigation = () => {
    return useNavigation<RootNavigationProp>()
}
