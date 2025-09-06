import { createSlice } from "@reduxjs/toolkit";

const gridValuesInitialState = [
    [
        { isChecked: false, value: "" },
        { isChecked: false, value: "" },
        { isChecked: false, value: "" },
    ],
    [
        { isChecked: false, value: "" },
        { isChecked: false, value: "" },
        { isChecked: false, value: "" },
    ],
    [
        { isChecked: false, value: "" },
        { isChecked: false, value: "" },
        { isChecked: false, value: "" },
    ],
];

const initialState = {
    value: gridValuesInitialState,
};

const gridValuesSlice = createSlice({
    name: "gridValues",
    initialState: initialState,
    reducers: {
        setGridValues: (
            state,
            action: { payload: typeof gridValuesInitialState }
        ) => {
            state.value = action.payload;
        },
        resetGame: (state) => {
            state.value = JSON.parse(JSON.stringify(gridValuesInitialState));
        },
    },
});

export const { setGridValues, resetGame } = gridValuesSlice.actions;

export const getGridValues = (state: { gridValues: typeof initialState }) =>
    state.gridValues.value;

export type GridValuesType = typeof gridValuesInitialState;

export default gridValuesSlice.reducer;
