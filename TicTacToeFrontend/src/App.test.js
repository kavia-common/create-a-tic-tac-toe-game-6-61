import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.useFakeTimers();

function clickSquare(i) {
  const btn = screen.getByTestId(`square-${i}`);
  fireEvent.click(btn);
}

describe('Tic Tac Toe App UI', () => {
  test('renders title and basic controls', () => {
    render(<App />);
    expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
    expect(screen.getByTestId('mode-select')).toBeInTheDocument();
    expect(screen.getByTestId('reset-btn')).toBeInTheDocument();
    expect(screen.getByTestId('board')).toBeInTheDocument();
  });

  test('turn indication updates after move', () => {
    render(<App />);
    const status = screen.getByTestId('status');
    expect(status.textContent).toMatch(/Turn: X/);
    clickSquare(0);
    // In single mode AI will think; advance timers to complete AI move
    jest.advanceTimersByTime(400);
    expect(status.textContent).toMatch(/Turn: X|Winner|Draw/);
  });

  test('prevents invalid moves and shows shake + message', () => {
    render(<App />);
    clickSquare(0);
    // attempt on same square
    clickSquare(0);
    const invalidMsg = screen.getByTestId('invalid-msg');
    expect(invalidMsg).toBeInTheDocument();
  });

  test('detects win and highlights', () => {
    render(<App />);
    fireEvent.change(screen.getByTestId('mode-select'), { target: { value: 'two' } });
    clickSquare(0); // X
    clickSquare(3); // O
    clickSquare(1); // X
    clickSquare(4); // O
    clickSquare(2); // X wins
    const status = screen.getByTestId('status');
    expect(status.textContent).toMatch(/Winner: X/);
    // squares 0,1,2 should have winning class
    expect(screen.getByTestId('square-0').className).toMatch(/winning/);
    expect(screen.getByTestId('square-1').className).toMatch(/winning/);
    expect(screen.getByTestId('square-2').className).toMatch(/winning/);
  });

  test('reset clears board and status', () => {
    render(<App />);
    fireEvent.change(screen.getByTestId('mode-select'), { target: { value: 'two' } });
    clickSquare(0); // X
    fireEvent.click(screen.getByTestId('reset-btn'));
    const status = screen.getByTestId('status');
    expect(status.textContent).toMatch(/Turn: X/);
    expect(screen.getByTestId('square-0').textContent).toBe('');
  });

  test('keyboard navigation with arrows and enter', () => {
    render(<App />);
    const sq0 = screen.getByTestId('square-0');
    sq0.focus();
    // Arrow Right -> square 1
    fireEvent.keyDown(sq0, { key: 'ArrowRight' });
    const sq1 = screen.getByTestId('square-1');
    expect(document.activeElement).toBe(sq1);
    // Space to place mark
    fireEvent.keyDown(sq1, { key: ' ' });
    // let AI move
    jest.advanceTimersByTime(400);
    const status = screen.getByTestId('status');
    expect(status.textContent).toMatch(/Turn: X|Winner|Draw/);
  });

  test('aria-live updates status text', () => {
    render(<App />);
    const status = screen.getByTestId('status');
    expect(status.getAttribute('aria-live')).toBe('polite');
  });
});
