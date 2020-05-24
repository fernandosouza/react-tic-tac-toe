import { createContext } from 'react';
import TicTacToe from './ticTacToe/TicTacToe';

export const GameContext = createContext<{
  game: TicTacToe | null
}>({
  game: new TicTacToe()
});
GameContext.displayName = 'GameContext';