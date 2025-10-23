# Tic Tac Toe React App

This project is a modern, minimalistic Tic Tac Toe game implemented entirely in React. It supports both two-player local mode and a single-player mode against a basic AI opponent. The app is fully client-side, requires no backend, and emphasizes accessibility, responsiveness, and testability.

## Features

- Single-player (vs AI) and two-player local modes
- Real-time board updates with clear turn indication
- Valid move enforcement with immediate feedback for invalid actions
- Win and draw detection, with winning line highlight
- Keyboard navigation (arrow keys) and Space/Enter to place marks
- ARIA roles/labels and polite live regions for screen readers
- Light/Dark theme toggle
- Responsive layout with mobile-friendly touch targets
- Comprehensive unit tests with Jest and React Testing Library
- Simple, self-contained React application with minimal dependencies

## Project Structure

- src/components
  - Game.js: Game container with mode selection, status, and controls
  - Board.js: Grid layout and keyboard navigation between squares
  - Square.js: Accessible square button with focus and ARIA support
- src/hooks
  - useTicTacToe.js: Core game state, rules enforcement, AI scheduling
- src/utils
  - gameRules.js: Winner detection, draw logic, available moves
  - ai.js: Heuristic AI for single-player mode
- src/App.js / src/App.css: App container, theme toggle, styling
- src/__tests__ and src/App.test.js: Unit and UI tests (Jest/RTL)

## Setup

Prerequisites:
- Node.js 16+ and npm 8+ recommended

Install dependencies:
- npm install

Start development server:
- npm start
- Open http://localhost:3000 in your browser

Build for production:
- npm run build
- Outputs to build/ with optimized assets

Run tests (Jest + React Testing Library):
- npm test
- Runs unit and component tests in watch mode

CI-friendly test run:
- CI=true npm test

## How to Play

- Choose game mode from the Mode selector:
  - Single Player (vs AI): You are X, AI is O. AI moves automatically after your turn.
  - Two Players: X and O alternate on the same device.
- Click or tap an empty square to place your mark.
- Use the keyboard:
  - Arrow keys to move focus between squares.
  - Space or Enter to place a mark.
- Invalid moves are prevented:
  - If you click an occupied square or try to play after the game ends, the app shows a brief shake animation and an explanatory message.
- Click “New Game” to reset at any time.

## Testing

This project ships with unit and UI tests using Jest and React Testing Library (RTL). Tests cover:
- Game rules (win/draw detection, available moves)
- AI move selection heuristics
- Hook behavior (turn switching, invalid moves, AI scheduling)
- UI interactions (clicks, keyboard navigation, aria-live updates, reset)

Local test commands:
- npm test
- CI=true npm test  (non-interactive)

Test locations:
- src/__tests__/gameRules.test.js
- src/__tests__/ai.test.js
- src/__tests__/useTicTacToe.test.js
- src/App.test.js

Optional: Cypress E2E tests
- Cypress is not installed by default. To add end-to-end tests:
  1) npm install --save-dev cypress
  2) npx cypress open (for interactive UI) or npx cypress run (CI mode)
  3) Create tests under cypress/e2e, for example:
     - Validate initial render (title, mode selector, reset button, board)
     - Simulate two-player game to a win and verify winning highlights
     - Single-player flow, verify AI makes a move
     - Keyboard navigation: arrow keys and Enter/Space to place mark
  4) For CI, prefer: npx cypress run --browser chrome

Note: Keep Cypress tests focused on end-to-end user journeys and leverage data-testid attributes already present in components.

## Accessibility

- Keyboard Support:
  - Arrow keys navigate between grid cells (Board.js manages focus)
  - Enter/Space activate the focused cell (Square.js handles keypress)
- Roles and ARIA:
  - Board: role="grid", aria-label="Tic Tac Toe board"
  - Square: role="gridcell", descriptive aria-labels per cell state
  - Status: aria-live="polite" for turn changes, wins, and draws
  - Alerts: invalid action messages use role="alert"
- Focus Indicators:
  - Visible focus outline for keyboard users (:focus-visible styling)
- Color Contrast:
  - Light/dark themes with sufficient contrast variables
- Touch Targets:
  - Large square buttons to support mobile and touch users

## Responsiveness

- Grid-based board with CSS variables for square sizing
- Mobile breakpoint reduces square size for smaller screens
- Controls wrap and remain accessible on narrow viewports
- Touch-action and user-select settings improve mobile UX

## Deployment

This app is a standard Create React App build:
- npm run build
- The production build is generated in the build/ directory.

Static hosting options:
- GitHub Pages: Serve the build directory via gh-pages or a static site action
- Netlify/Vercel: Drag-and-drop the build folder or connect the repo for auto-deploy
- Any static server: Serve the build directory root as a static site

Example: Serve locally with a simple static server
- npm install --global serve
- serve -s build

Ensure client-side routing isn’t required (this app uses no routing), so any static hosting will work without special rewrites.

## Known Behaviors and Notes

- AI thinks briefly before moving to simulate a more natural pace.
- Switching modes resets the game to maintain a deterministic and simple UX.
- Attempting actions while the AI is “thinking” will show a friendly message and not register a move.

## Troubleshooting

- Port already in use:
  - Your dev server may already be running at http://localhost:3000.
- Test hangs in CI:
  - Use CI=true npm test for non-interactive test runs.
- Build issues:
  - Delete node_modules and reinstall: rm -rf node_modules && npm install

## License

This project is provided as part of an internal exercise/demo. Use and modify as needed within your organization.
