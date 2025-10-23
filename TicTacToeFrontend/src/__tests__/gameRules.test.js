import { calculateWinner, isDraw, getAvailableMoves } from '../utils/gameRules';

describe('gameRules.calculateWinner', () => {
  test('detects all row wins', () => {
    expect(calculateWinner(['X', 'X', 'X', null, null, null, null, null, null])?.winner).toBe('X');
    expect(calculateWinner([null, null, null, 'O', 'O', 'O', null, null, null])?.winner).toBe('O');
    expect(calculateWinner([null, null, null, null, null, null, 'X', 'X', 'X'])?.winner).toBe('X');
  });

  test('detects all column wins', () => {
    expect(calculateWinner(['O', null, null, 'O', null, null, 'O', null, null])?.winner).toBe('O');
    expect(calculateWinner([null, 'X', null, null, 'X', null, null, 'X', null])?.winner).toBe('X');
    expect(calculateWinner([null, null, 'O', null, null, 'O', null, null, 'O'])?.winner).toBe('O');
  });

  test('detects diagonal wins', () => {
    expect(calculateWinner(['X', null, null, null, 'X', null, null, null, 'X'])?.winner).toBe('X');
    expect(calculateWinner([null, null, 'O', null, 'O', null, 'O', null, null])?.winner).toBe('O');
  });

  test('returns null for no winner', () => {
    expect(calculateWinner([null, null, null, null, null, null, null, null, null])).toBe(null);
  });

  test('provides winning line indices', () => {
    const res = calculateWinner(['X', 'X', 'X', null, null, null, null, null, null]);
    expect(res.line).toEqual([0, 1, 2]);
  });
});

describe('gameRules.isDraw', () => {
  test('true when board full and no winner', () => {
    const board = ['X','O','X','X','O','O','O','X','X'];
    expect(isDraw(board)).toBe(true);
  });

  test('false when not full', () => {
    const board = Array(9).fill(null);
    expect(isDraw(board)).toBe(false);
  });

  test('false when winner exists', () => {
    const board = ['X','X','X',null,null,null,null,null,null];
    expect(isDraw(board)).toBe(false);
  });
});

describe('gameRules.getAvailableMoves', () => {
  test('lists empty indices', () => {
    const board = ['X', null, 'O', null, 'X', null, null, 'O', null];
    expect(getAvailableMoves(board)).toEqual([1, 3, 5, 6, 8]);
  });
});
