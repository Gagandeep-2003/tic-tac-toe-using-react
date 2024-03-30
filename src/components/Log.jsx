export default function Log({ turns }) {
    //here we are just getting the gameturns array from app.jsx and then we are using the properties inside it to display as the list items and nothing else we are doing here
    return (
        <ol id="log">
            {turns.map((turn) => (
                <li key={`${turn.player}-${turn.square.row}-${turn.square.col}`}>
                    {turn.player} selected {turn.square.row},{turn.square.col}
                </li>
            ))}
        </ol>
    );
}
