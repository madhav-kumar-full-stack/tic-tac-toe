import { Card } from 'primereact/card';

type Props = {
    row: { isChecked: boolean; value: string };
    handleClick: () => void;
};

const Cell: React.FC<Props> = ({ row, handleClick }) => {
    return (
        <Card className="flex justify-content-center align-items-center text-6xl w-4" onClick={handleClick}>
            {row.value}
        </Card>
    );
};

export default Cell;
