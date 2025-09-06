import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getGridValues,
    resetGame,
    setGridValues,
} from "../../store/gridValuesSlice";
import {
    checkForWinner,
    oPoints,
    resetMessage,
    resetUserData,
    xPoints,
} from "../../store/gameStatusSlice";
import {
    getCurrentPlayer,
    switchCurrentPlayer,
    makeOcurrentPlayer,
    makeXcurrentPlayer,
} from "../../store/playersSlice";
import { getWinningPatterns } from "../../store/winningPatternsSlice";

import Dialog from "../CommonDialog/CommonDialog";
import Cell from "./Cell/Cell";
import styles from "./Grid.module.css";

import { PLAYERS } from "../../constants";

const Grid = () => {
    const grid = useSelector(getGridValues);
    const winningCombinations = useSelector(getWinningPatterns);
    const currentPlayer = useSelector(getCurrentPlayer);
    const xPlayerPoints = useSelector(xPoints);
    const oPlayerPoints = useSelector(oPoints);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkForWinner({ grid, winningCombinations }));
    }, [grid, winningCombinations]);

    const handleCellClick = (rowIndex: number, cellIndex: number) => {
        const newGrid = JSON.parse(JSON.stringify(grid));
        const oldValue = newGrid[rowIndex][cellIndex].isChecked;

        if (!oldValue) {
            newGrid[rowIndex][cellIndex].isChecked = true;
            newGrid[rowIndex][cellIndex].value = currentPlayer;

            dispatch(switchCurrentPlayer());
        }

        dispatch(setGridValues(newGrid));
    };

    const onResetMessage = () => {
        dispatch(resetMessage());
        dispatch(resetGame());
    };

    const onResetGame = () => {
        onResetMessage();
        dispatch(resetUserData());
    };

    const makeCurrentPlayer = (player: string) => {
        if (PLAYERS.O === player) {
            dispatch(makeOcurrentPlayer());
        } else if (PLAYERS.X === player) {
            dispatch(makeXcurrentPlayer());
        }
    };

    return (
        <div className="flex flex-column justify-content-center align-items-center h-screen p-5">
            <Dialog
                onResetMessage={onResetMessage}
                onResetGame={onResetGame}
                makeCurrentPlayer={makeCurrentPlayer}
            />
            <div className="flex flex-column align-items-center w-full gap-3">
                <h1 className="m-0 text-2xl font-bold">Tic-Tac-Toe</h1>
                <p className="m-0">Current Player: {currentPlayer}</p>
                <div className="flex gap-8 white-space-nowrap">
                    <span className="flex align-items-center">
                        Player X points: {xPlayerPoints}
                    </span>
                    <span className="flex align-items-center">
                        Player O points: {oPlayerPoints}
                    </span>
                </div>
            </div>
            <div className="flex flex-1 align-items-center mt-5">
                <div className={`flex flex-column gap-1 ${styles.gridContainer}`}>
                    {grid.map((rows, rowIndex) => (
                        <div key={rowIndex} className="flex flex-1 gap-1">
                            {rows.map((row, cellIndex) => (
                                <Cell
                                    key={rowIndex + cellIndex}
                                    row={row}
                                    handleClick={() => handleCellClick(rowIndex, cellIndex)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Grid;
