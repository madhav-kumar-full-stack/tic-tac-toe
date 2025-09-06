import { createSlice } from "@reduxjs/toolkit";
import { PLAYERS } from "../constants";

const initialState = {
    value: PLAYERS.X,
};

const playerSlice = createSlice({
    name: "players",
    initialState: initialState,
    reducers: {
        switchCurrentPlayer: (state) => {
            state.value = state.value === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
        },
        makeXcurrentPlayer: (state) => {
            state.value = PLAYERS.X;
        },
        makeOcurrentPlayer: (state) => {
            state.value = PLAYERS.O;
        },
    },
});

export const getCurrentPlayer = (state: { players: typeof initialState }) =>
    state.players.value;

export const { switchCurrentPlayer, makeOcurrentPlayer, makeXcurrentPlayer } =
    playerSlice.actions;

export default playerSlice.reducer;
