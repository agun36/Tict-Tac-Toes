import { render, fireEvent } from '@testing-library/react';
import { GameOver } from './GameOver';

describe('GameOver', () => {
  it('renders winner message when there is a winner', () => {
    const { getByText } = render(<GameOver winner="X" onRestart={() => {}} />);
    expect(getByText('Game Over!')).toBeInTheDocument();
    expect(getByText('Congratulations, X!')).toBeInTheDocument();
    expect(getByText('Rematch!')).toBeInTheDocument();
  });

  it('renders draw message when there is no winner', () => {
    const { getByText } = render(<GameOver winner={null} onRestart={() => {}} />);
    expect(getByText('Game Over!')).toBeInTheDocument();
    expect(getByText('It\'s a draw!')).toBeInTheDocument();
    expect(getByText('Rematch!')).toBeInTheDocument();
  });

  it('calls onRestart when Rematch button is clicked', () => {
    const onRestartMock = jest.fn();
    const { getByText } = render(<GameOver winner={null} onRestart={onRestartMock} />);
    fireEvent.click(getByText('Rematch!'));
    expect(onRestartMock).toHaveBeenCalled();
  });
});