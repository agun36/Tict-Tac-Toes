import "./Log.scss";
export default function Log({ turns }) {
    return (
      <ol id="log">
        {turns.map((turn) => (
          // For each turn, display a list item with the player's symbol and the selected square's coordinates
          <li key={`${turn.square.row}-${turn.square.col}`}>
            {turn.player} selected {turn.square.row}, {turn.square.col}
          </li>
        ))}
      </ol>
    );
}
