import { createSlice } from "@reduxjs/toolkit";
import type { GridValuesType } from "./gridValuesSlice";
import type { WinningPatternsType } from "./winningPatternsSlice";

import {
    DRAW_MESSAGE,
    GAME_IN_PROGRESS,
    PLAYER_O_WINS,
    PLAYER_X_WINS,
    PLAYERS,
} from "../constants";

const initialState = {
    message: GAME_IN_PROGRESS,
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

                if (!gridFirstValue) {
                    emptyGridCount++;
                } else if (!gridSecondValue) {
                    emptyGridCount++;
                } else if (!gridThirdValue) {
                    emptyGridCount++;
                }

                if (gridFirstValue &&
                    gridFirstValue === gridSecondValue &&
                    gridSecondValue === gridThirdValue
                ) {
                    if (gridFirstValue === PLAYERS.X) {
                        state.xPoints = state.xPoints + 1;
                        state.message = PLAYER_X_WINS;
                        return;
                    } else {
                        state.oPoints = state.oPoints + 1;
                        state.message = PLAYER_O_WINS;
                        return;
                    }
                }
            }

            if (emptyGridCount > 0 && emptyGridCount <= 9) {
                if (state.message !== GAME_IN_PROGRESS) {
                    state.message = GAME_IN_PROGRESS;
                }
            } else if (emptyGridCount === 0) {
                state.message = DRAW_MESSAGE;
            }
        },
        resetMessage: (state) => {
            state.message = GAME_IN_PROGRESS;
        },
        resetUserData: (state) => {
            state.message = GAME_IN_PROGRESS;
            state.xPoints = 0;
            state.oPoints = 0;
        },
    },
});

export const getStatusMessage = (state: { gameStatus: typeof initialState }) =>
    state.gameStatus.message;

export const xPoints = (state: { gameStatus: typeof initialState }) =>
    state.gameStatus.xPoints;
export const oPoints = (state: { gameStatus: typeof initialState }) =>
    state.gameStatus.oPoints;

export const { checkForWinner, resetMessage, resetUserData } =
    gameStatusSlice.actions;

export default gameStatusSlice.reducer;
