/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { Game } from "../../domain/types";

export const generateGameInitialState: (state?: Partial<Game>) => Game = (state) => ({
  id: null,
  players: [],
  opponentName: "",
  teamName: "Rennes GAA",
  duration: 60,
  gameName: "",
  date: "2023-05-29T14:00:00.000Z",
  teamsScore: {
    us: { points: [], goals: [], missed: [], blocked: [], accuracy: null },
    them: { points: [], goals: [], missed: [], blocked: [], accuracy: null },
  },
  gameEnded: false,
  ...state,
});

const generateFakeGame = (state) =>
  generateGameInitialState({
    players: [
      { firstName: "Jean", lastName: "Dupont", id: 1 },
      { firstName: "Jeff", lastName: "Dupont", id: 2 },
      { firstName: "Joe", lastName: "Tupont", id: 3 },
      { firstName: "Mike", lastName: "Bupont", id: 4 },
    ],
    opponentName: "Nantes A",
    teamName: "Rennes A",
    duration: 60,
    gameName: "",
    teamsScore: {
      us: {
        points: [
          { x: 0, y: 0, playerId: undefined },
          { x: 0, y: 0, playerId: undefined },
          { x: 0, y: 0, playerId: undefined },
          { x: 0, y: 0, playerId: undefined },
        ],
        goals: [{ x: 0, y: 0, playerId: undefined }],
        missed: [{ x: 0, y: 0, playerId: undefined }],
        blocked: [{ x: 0, y: 0, playerId: undefined }],
        accuracy: 60,
      },
      them: {
        points: [{ x: 0, y: 0, playerId: undefined }],
        goals: [],
        missed: [],
        blocked: [],
        accuracy: null,
      },
    },
    ...state,
  });

const initialState = {
  gameList: [
    generateFakeGame({
      id: 1,
    }),
    generateFakeGame({
      id: 2,
      gameEnded: true,
    }),
    generateFakeGame({
      id: 3,
      gameEnded: true,
    }),
  ],
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addGame: (state, action) => {
      state.gameList.push(action.payload);
    },
    replaceGame: (state, action) => {
      const gameIndex = state.gameList.findIndex(
        (game) => game.id === action.payload.id
      );
      state.gameList[gameIndex] = action.payload;
    },
  },
});

export const { addGame, replaceGame } = gamesSlice.actions;
export default gamesSlice.reducer;
