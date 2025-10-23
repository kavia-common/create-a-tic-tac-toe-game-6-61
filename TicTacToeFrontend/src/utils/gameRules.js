//
// Utilities for Tic Tac Toe game rules
//

// PUBLIC_INTERFACE
export function calculateWinner(board) {
  /** Determine if there is a winner on the board.
   * Returns { winner: 'X'|'O', line: [a,b,c] } if winner exists, otherwise null.
   */
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diags
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function isDraw(board) {
  /** Return true if all squares are filled and there is no winner. */
  return !calculateWinner(board) && board.every((s) => s);
}

// PUBLIC_INTERFACE
export function getAvailableMoves(board) {
  /** Return indices that are empty squares. */
  const moves = [];
  for (let i = 0; i < board.length; i += 1) {
    if (!board[i]) moves.push(i);
  }
  return moves;
}
