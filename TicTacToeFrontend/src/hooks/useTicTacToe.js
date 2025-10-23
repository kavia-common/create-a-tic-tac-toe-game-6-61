import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { calculateWinner, isDraw } from '../utils/gameRules';
import { getBestMove } from '../utils/ai';

const INITIAL_BOARD = Array(9).fill(null);

// PUBLIC_INTERFACE
export function useTicTacToe(initialMode = 'single') {
  /**
   * Hook for Tic Tac Toe game state and actions.
   * State:
   * - board: Array(9) of 'X'|'O'|null
   * - currentPlayer: 'X'|'O'
   * - status: string for UI status
   * - winner: 'X'|'O'|null
   * - winningLine: array of indices or null
   * - mode: 'single' | 'two'
   * - inputLock: boolean to prevent interaction (e.g., while AI thinking)
   * - invalidMove: {index:number|null, message:string|null}
   *
   * Actions:
   * - handlePlayerMove(index)
   * - resetGame()
   * - setMode(mode)
   */
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [mode, setMode] = useState(initialMode);
  const [inputLock, setInputLock] = useState(false);
  const [invalidMove, setInvalidMove] = useState({ index: null, message: null });

  const aiTimeoutRef = useRef(null);

  const updateOutcome = useCallback((nextBoard) => {
    const win = calculateWinner(nextBoard);
    if (win) {
      setWinner(win.winner);
      setWinningLine(win.line);
      return { done: true, draw: false, win };
    }
    if (isDraw(nextBoard)) {
      setWinner(null);
      setWinningLine(null);
      return { done: true, draw: true, win: null };
    }
    return { done: false, draw: false, win: null };
  }, []);

  const status = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (!winner && isDraw(board)) return 'Draw!';
    return `Turn: ${currentPlayer}`;
  }, [board, currentPlayer, winner]);

  // Cleanup AI timeout on unmount
  useEffect(() => {
    return () => {
      if (aiTimeoutRef.current) clearTimeout(aiTimeoutRef.current);
    };
  }, []);

  const scheduleAIIfNeeded = useCallback((nextBoard, nextPlayer) => {
    if (mode === 'single' && nextPlayer === 'O') {
      setInputLock(true);
      // Simulate AI thinking delay
      aiTimeoutRef.current = setTimeout(() => {
        const aiMove = getBestMove(nextBoard, 'O', 'X');
        if (aiMove !== null) {
          setBoard((b) => {
            if (b[aiMove]) return b; // Safety
            const b2 = [...b];
            b2[aiMove] = 'O';
            return b2;
          });
          const outcome = updateOutcome(
            (() => {
              const b2 = [...nextBoard];
              b2[aiMove] = 'O';
              return b2;
            })()
          );
          if (!outcome.done) {
            setCurrentPlayer('X');
            setInputLock(false);
          } else {
            setInputLock(false);
          }
        } else {
          setInputLock(false);
        }
      }, 350);
    }
  }, [mode, updateOutcome]);

  // PUBLIC_INTERFACE
  const resetGame = useCallback(() => {
    if (aiTimeoutRef.current) {
      clearTimeout(aiTimeoutRef.current);
      aiTimeoutRef.current = null;
    }
    setBoard(INITIAL_BOARD);
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setInputLock(false);
    setInvalidMove({ index: null, message: null });
  }, []);

  // PUBLIC_INTERFACE
  const setModeSafe = useCallback((m) => {
    setMode(m);
    // Reset when switching modes to keep UX simple and deterministic
    resetGame();
  }, [resetGame]);

  // PUBLIC_INTERFACE
  const handlePlayerMove = useCallback((index) => {
    // Prevent interactions while AI thinking or after game end
    if (inputLock) {
      setInvalidMove({ index, message: 'Please wait for AI move.' });
      return;
    }
    if (winner || isDraw(board)) {
      setInvalidMove({ index, message: 'Game has ended. Start a new game.' });
      return;
    }
    if (board[index]) {
      setInvalidMove({ index, message: 'Invalid move: square already occupied.' });
      return;
    }

    setInvalidMove({ index: null, message: null });
    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);

    const outcome = updateOutcome(nextBoard);
    if (!outcome.done) {
      const next = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(next);
      scheduleAIIfNeeded(nextBoard, next);
    }
  }, [board, currentPlayer, inputLock, scheduleAIIfNeeded, updateOutcome, winner]);

  return {
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
    setMode: setModeSafe,
  };
}
