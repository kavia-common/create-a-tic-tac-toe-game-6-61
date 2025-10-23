import { renderHook, act } from '@testing-library/react';
import { useTicTacToe } from '../hooks/useTicTacToe';

jest.useFakeTimers();

describe('useTicTacToe', () => {
  test('initial state', () => {
    const { result } = renderHook(() => useTicTacToe('two'));
    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.currentPlayer).toBe('X');
    expect(result.current.status).toMatch(/Turn: X/);
  });

  test('valid move updates board and switches player', () => {
    const { result } = renderHook(() => useTicTacToe('two'));
    act(() => result.current.handlePlayerMove(0));
    expect(result.current.board[0]).toBe('X');
    expect(result.current.currentPlayer).toBe('O');
  });

  test('prevents move on occupied cell and sets invalid flag', () => {
    const { result } = renderHook(() => useTicTacToe('two'));
    act(() => result.current.handlePlayerMove(0));
    act(() => result.current.handlePlayerMove(0));
    expect(result.current.invalidMove.index).toBe(0);
    expect(result.current.invalidMove.message).toBeTruthy();
  });

  test('prevents moves after game end', () => {
    const { result } = renderHook(() => useTicTacToe('two'));
    // X wins: 0,1,2
    act(() => result.current.handlePlayerMove(0)); // X
    act(() => result.current.handlePlayerMove(3)); // O
    act(() => result.current.handlePlayerMove(1)); // X
    act(() => result.current.handlePlayerMove(4)); // O
    act(() => result.current.handlePlayerMove(2)); // X wins
    act(() => result.current.handlePlayerMove(5)); // attempt after end
    expect(result.current.invalidMove.message).toMatch(/Game has ended/);
  });

  test('AI makes a move in single mode after X', () => {
    const { result } = renderHook(() => useTicTacToe('single'));
    act(() => result.current.handlePlayerMove(0)); // X
    expect(result.current.inputLock).toBe(true);
    // Fast-forward timers to trigger AI
    act(() => {
      jest.advanceTimersByTime(400);
    });
    // After AI move, input should unlock and it's X turn
    expect(result.current.inputLock).toBe(false);
    expect(result.current.currentPlayer).toBe('X');
    // One of the squares besides 0 should be filled
    expect(result.current.board.filter(Boolean).length).toBe(2);
  });

  test('reset clears board and sets current player to X', () => {
    const { result } = renderHook(() => useTicTacToe('two'));
    act(() => result.current.handlePlayerMove(0));
    act(() => result.current.resetGame());
    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.currentPlayer).toBe('X');
  });
});
