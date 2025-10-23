import React, { useCallback } from 'react';

function Square({
  value,
  onClick,
  index,
  isWinning,
  isInvalid,
}) {
  const handleKeyDown = useCallback((e) => {
    // Activate with Enter/Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(index);
    }
  }, [index, onClick]);

  return (
    <button
      type="button"
      className={`ttt-square ${isWinning ? 'winning' : ''} ${isInvalid ? 'shake' : ''}`}
      onClick={() => onClick(index)}
      onKeyDown={handleKeyDown}
      aria-label={`Square ${index + 1}${value ? `, ${value}` : ', empty'}`}
      role="gridcell"
      data-testid={`square-${index}`}
      tabIndex={0}
    >
      {value}
    </button>
  );
}

export default Square;
