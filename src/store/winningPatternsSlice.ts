import { createSlice } from "@reduxjs/toolkit"

const winningPatternsInitialState = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    // Diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
]

const initialState = {
    value: winningPatternsInitialState,
}

const winningPatternsSlice = createSlice({
    name: "winningPatterns",
    initialState: initialState,
    reducers: {

    },
});

export const getWinningPatterns = (state: { winningPatterns: typeof initialState }) => state.winningPatterns.value;

export type WinningPatternsType = typeof winningPatternsInitialState;

export default winningPatternsSlice.reducer;