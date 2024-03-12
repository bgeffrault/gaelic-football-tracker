/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  playerId: number | null | undefined;
} = {
  playerId: undefined,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerId: (state, action: PayloadAction<number>) => {
      state.playerId = action.payload;
    },
    resetPlayerId: (state) => {
      state.playerId = undefined;
    },
  },
});

export const { setPlayerId, resetPlayerId } = playerSlice.actions;
export default playerSlice.reducer;
