import { createSlice } from "@reduxjs/toolkit";
import type { GridValuesType } from "./gridValuesSlice";
import type { WinningPatternsType } from "./winningPatternsSlice";

import { DRAW_MESSAGE, GAME_IN_PROGRESS } from "../constants";

const initialState = {
    value: "",
    xPoints: 0,
    oPoints: 0,
};

const gameStatusSlice = createSlice({
    name: "gameStatus",
    initialState: initialState,
    reducers: {
        checkForWinner: (
            state,
            action: {
                payload: {
                    grid: GridValuesType;
                    winningCombinations: WinningPatternsType;
                };
            }
        ) => {
            const { grid, winningCombinations } = action.payload;
            let emptyGridCount = 0;

            for (const combination of winningCombinations) {
                const firstCombination = combination[0];
                const secondCombination = combination[1];
                const thirdCombination = combination[2];

                const gridFirstValue =
                    grid[firstCombination[0]][firstCombination[1]].value;
                const gridSecondValue =
                    grid[secondCombination[0]][secondCombination[1]].value;
                const gridThirdValue =
                    grid[thirdCombination[0]][thirdCombination[1]].value;

                if (!gridFirstValue || !gridSecondValue || !gridThirdValue) {
                    emptyGridCount++;
                    continue;
                }

                if (
                    gridFirstValue === gridSecondValue &&
                    gridSecondValue === gridThirdValue
                ) {
                    if (gridFirstValue === "X") {
                        state.xPoints = state.xPoints + 1;
                    } else {
                        state.oPoints = state.oPoints + 1;
                    }
                    state.value = `Player ${gridFirstValue} wins!`;
                }
            }

            if (emptyGridCount === 9) {
                state.value = GAME_IN_PROGRESS;
            } else if (emptyGridCount === 0) {
                state.value = DRAW_MESSAGE;
            }
        },
    },
});

export const getGameStatus = (state: { gameStatus: typeof initialState }) =>
    state.gameStatus.value;

export const xPoints = (state: {gameStatus: typeof initialState}) => state.gameStatus.xPoints;
export const oPoints = (state: {gameStatus: typeof initialState}) => state.gameStatus.oPoints;

export const { checkForWinner } = gameStatusSlice.actions;

export default gameStatusSlice.reducer;
