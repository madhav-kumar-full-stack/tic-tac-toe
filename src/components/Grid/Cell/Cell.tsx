type Props = {
    row: { isChecked: boolean; value: string };
    handleClick: () => void;
};

const Cell: React.FC<Props> = ({ row, handleClick }) => {
    return (
        <button className="min-w-80 min-h-40" onClick={handleClick}>
            {row.value}
        </button>
    );
};

export default Cell;
