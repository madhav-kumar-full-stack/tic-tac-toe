import { configureStore } from "@reduxjs/toolkit";

import gameStatusReducer from "./gameStatusSlice";
import playerReducer from "./playersSlice"
import winningPatternsReducer from "./winningPatternsSlice";
import gridValuesReducer from "./gridValuesSlice";

const store = configureStore({
    reducer: {
        gameStatus: gameStatusReducer,
        players: playerReducer,
        winningPatterns: winningPatternsReducer,
        gridValues: gridValuesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;