import { useEffect, useRef, useState } from "react";
import Cell from "./Cell/Cell";

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
]

const Grid = () => {
    const [gridValues, setGridValues] = useState<
        Array<Array<{ isChecked: boolean; value: string }>>
    >(gridValuesInitialState);

    const winningCombinations = [
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
    ];

    const users = ["X", "O"];
    let currentUserIdxRef = useRef(0);

    const checkForWinner = (grid: typeof gridValues) => {
        let emptyGridCount = 0;

        for (const combination of winningCombinations) {
            const firstCombination = combination[0];
            const secondCombination = combination[1];
            const thirdCombination = combination[2];

            const gridFirstValue = grid[firstCombination[0]][firstCombination[1]].value;
            const gridSecondValue = grid[secondCombination[0]][secondCombination[1]].value;
            const gridThirdValue = grid[thirdCombination[0]][thirdCombination[1]].value;

            if (!gridFirstValue || !gridSecondValue || !gridThirdValue) {
                emptyGridCount++;
                continue;
            }

            if (
                gridFirstValue === gridSecondValue &&
                gridSecondValue === gridThirdValue
            ) {
                return gridFirstValue;
            }
        }

        if (emptyGridCount === 9) {
            return null;
        } else if (emptyGridCount === 0) {
            alert("It's a draw!");
            resetGame();
            return null;
        }
    };

    useEffect(() => {
        const winner = checkForWinner(gridValues);
        if (winner) {
            alert(`Player ${winner} wins!`);
            resetGame();
        }
    }, [gridValues]);


    const handleCellClick = (rowIndex: number, cellIndex: number) => {
        setGridValues((prev) => {
            const newGrid = JSON.parse(JSON.stringify(prev));
            const oldValue = newGrid[rowIndex][cellIndex].isChecked;

            if (!oldValue) {
                newGrid[rowIndex][cellIndex].isChecked = true;
                newGrid[rowIndex][cellIndex].value = users[currentUserIdxRef.current];
                currentUserIdxRef.current = (currentUserIdxRef.current + 1) % 2;
            }

            return newGrid;
        });
    };

    const resetGame = () => {
        setGridValues(gridValuesInitialState);
        currentUserIdxRef.current = 0;
    }

    return (
        <div className="flex flex-col gap-1">
            {gridValues.map((rows, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                    {rows.map((row, cellIndex) => (
                        <div key={rowIndex + cellIndex} className="">
                            <Cell
                                row={row}
                                handleClick={() => handleCellClick(rowIndex, cellIndex)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
