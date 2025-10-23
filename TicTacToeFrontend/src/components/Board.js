import React, { useCallback, useRef } from 'react';
import Square from './Square';

function Board({
  board,
  onSquareClick,
  winningLine = [],
  invalidIndex = null,
}) {
  const refs = useRef([]);

  const handleKeyDown = useCallback((e, idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;

    const focusCell = (r, c) => {
      const nextIdx = r * 3 + c;
      const el = refs.current[nextIdx];
      if (el) el.focus();
    };

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        focusCell(Math.max(0, row - 1), col);
        break;
      case 'ArrowDown':
        e.preventDefault();
        focusCell(Math.min(2, row + 1), col);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        focusCell(row, Math.max(0, col - 1));
        break;
      case 'ArrowRight':
        e.preventDefault();
        focusCell(row, Math.min(2, col + 1));
        break;
      default:
        break;
    }
  }, []);

  return (
    <div
      className="ttt-board"
      role="grid"
      aria-label="Tic Tac Toe board"
      data-testid="board"
    >
      {board.map((value, idx) => (
        <div
          key={idx}
          role="presentation"
          onKeyDown={(e) => handleKeyDown(e, idx)}
          ref={(el) => { refs.current[idx] = el; }}
        >
          <Square
            value={value}
            onClick={onSquareClick}
            index={idx}
            isWinning={winningLine.includes(idx)}
            isInvalid={invalidIndex === idx}
          />
        </div>
      ))}
    </div>
  );
}

export default Board;
