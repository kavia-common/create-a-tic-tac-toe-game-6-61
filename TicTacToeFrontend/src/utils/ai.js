//
// Basic AI utilities for Tic Tac Toe
//
import { calculateWinner, getAvailableMoves } from './gameRules';

// PUBLIC_INTERFACE
export function getBestMove(board, aiPlayer = 'O', humanPlayer = 'X') {
  /** Compute the best move for AI using simple heuristics:
   * 1) Win if possible
   * 2) Block opponent win
   * 3) Take center
   * 4) Take a corner
   * 5) Take a side
   * Returns an index from 0..8 or null if no moves.
   */
  const moves = getAvailableMoves(board);
  if (moves.length === 0) return null;

  // 1) Win
  for (const idx of moves) {
    const copy = [...board];
    copy[idx] = aiPlayer;
    if (calculateWinner(copy)) return idx;
  }

  // 2) Block
  for (const idx of moves) {
    const copy = [...board];
    copy[idx] = humanPlayer;
    if (calculateWinner(copy)) return idx;
  }

  // 3) Center
  if (moves.includes(4)) return 4;

  // 4) Corner preference
  const corners = [0, 2, 6, 8];
  for (const c of corners) {
    if (moves.includes(c)) return c;
  }

  // 5) Side
  const sides = [1, 3, 5, 7];
  for (const s of sides) {
    if (moves.includes(s)) return s;
  }

  // Fallback
  return moves[0] ?? null;
}
