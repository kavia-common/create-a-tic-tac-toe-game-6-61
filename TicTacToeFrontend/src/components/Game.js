import React from 'react';
import { useTicTacToe } from '../hooks/useTicTacToe';
import Board from './Board';

// PUBLIC_INTERFACE
function Game() {
  /** Game container component responsible for rendering
   * controls, board and status while using the useTicTacToe hook.
   */
  const {
    board,
    currentPlayer,
    status,
    winner,
    winningLine,
    mode,
    inputLock,
    invalidMove,
    handlePlayerMove,
    resetGame,
    setMode,
  } = useTicTacToe('single');

  return (
    <div className="game container">
      <div className="controls">
        <div className="mode-switch">
          <label htmlFor="mode-select">Mode:</label>
          <select
            id="mode-select"
            aria-label="Game mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            data-testid="mode-select"
          >
            <option value="single">Single Player (vs AI)</option>
            <option value="two">Two Players</option>
          </select>
        </div>
        <button className="btn btn-large" onClick={resetGame} data-testid="reset-btn" aria-label="Reset game">
          New Game
        </button>
      </div>

      <div className="status" aria-live="polite" data-testid="status">
        {status}{inputLock ? ' (AI thinking...)' : ''}
      </div>

      <Board
        board={board}
        onSquareClick={handlePlayerMove}
        winningLine={winningLine || []}
        invalidIndex={invalidMove.index}
      />

      <div className="legend" aria-hidden="true">
        <span className={`pill ${currentPlayer === 'X' ? 'active' : ''}`} data-testid="turn-x">X</span>
        <span className={`pill ${currentPlayer === 'O' ? 'active' : ''}`} data-testid="turn-o">O</span>
        {winner !== null && (
          <span className="pill winner" data-testid="winner-pill">{winner ? `Winner: ${winner}` : 'Draw'}</span>
        )}
      </div>

      {invalidMove.message && (
        <div className="invalid-message" role="alert" aria-live="polite" data-testid="invalid-msg">
          {invalidMove.message}
        </div>
      )}
    </div>
  );
}

export default Game;
