import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: "X",
}

const playerSlice = createSlice({
    name: "players",
    initialState: initialState,
    reducers: {
        switchCurrentPlayer: (state) => {
            state.value = state.value === "X" ? "O" : "X";
        }
    }
})

export const getCurrentPlayer = (state: { players: typeof initialState }) => state.players.value;

export const { switchCurrentPlayer } = playerSlice.actions;

export default playerSlice.reducer;