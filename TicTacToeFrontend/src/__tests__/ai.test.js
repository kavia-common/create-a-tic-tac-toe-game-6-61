import { getBestMove } from '../utils/ai';

describe('AI getBestMove', () => {
  test('wins if possible', () => {
    const board = ['O', 'O', null, null, 'X', null, 'X', null, null];
    // AI is 'O' and can win at 2
    expect(getBestMove(board, 'O', 'X')).toBe(2);
  });

  test('blocks opponent winning move', () => {
    const board = ['X', 'X', null, null, 'O', null, null, null, null];
    expect(getBestMove(board, 'O', 'X')).toBe(2);
  });

  test('takes center if available', () => {
    const board = [null, null, null, null, null, null, null, null, null];
    expect(getBestMove(board, 'O', 'X')).toBe(4);
  });

  test('takes a corner when center is unavailable', () => {
    const board = ['X', null, null, null, 'X', null, null, null, null];
    const move = getBestMove(board, 'O', 'X');
    expect([0, 2, 6, 8]).toContain(move);
  });

  test('takes a side when no center/corner open', () => {
    const board = [null,'X',null,'X','O','X',null,'X',null];
    const move = getBestMove(board, 'O', 'X');
    expect([1,3,5,7]).toContain(move);
  });
});
