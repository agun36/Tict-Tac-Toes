import '../GameOver/GameOver.scss';

export const GameOver = ({winner, onRestart}) => {
    return (
      <section id="game-over">
          <h2>Game Over!</h2>
          {/* If there's a winner, congratulate them */}
          {winner && <p>Congratulations, {winner}!</p>}
           {/* If there's no winner, declare a draw */}
          {!winner && <p>It&apos;s a draw!</p>}
           {/* Button to start a new game */}
          <p><button onClick={onRestart}>Rematch!</button></p>
      </section>
    )
}
