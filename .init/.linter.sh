#!/bin/bash
cd /home/kavia/workspace/code-generation/create-a-tic-tac-toe-game-6-61/TicTacToeFrontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

