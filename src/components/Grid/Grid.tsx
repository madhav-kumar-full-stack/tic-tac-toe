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
        [[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]],

        // Columns
        [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]],

        // Diagonals
        [[0, 0], [1, 1], [2, 2],], [[0, 2], [1, 1], [2, 0]]
    ];

    const users = ["X", "O"];
    let currentUserIdxRef = useRef(0);

    const checkForWinner = (grid: typeof gridValues) => {
        for (const combination of winningCombinations) {

            const firstComination = combination[0];
            const secondComination = combination[1];
            const thirdComination = combination[2];


            const gridFirstValue = grid[firstComination[0]][firstComination[1]].value;
            const gridSecondValue = grid[secondComination[0]][secondComination[1]].value;
            const gridThirdValue = grid[thirdComination[0]][thirdComination[1]].value;

            if (!gridFirstValue || !gridSecondValue || !gridThirdValue) continue;

            if (
                gridFirstValue === gridSecondValue &&
                gridSecondValue === gridThirdValue
            ) {
                return gridFirstValue;
            }
        }
        return null;
    };

    useEffect(() => {
        const winner = checkForWinner(gridValues);
        if (winner) {
            alert(`Player ${winner} wins!`);
            setGridValues(gridValuesInitialState);
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
