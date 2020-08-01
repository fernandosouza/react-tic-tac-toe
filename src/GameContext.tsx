import { createContext } from 'react';
import TicTacToe, { ITicTacToe } from './ticTacToe/TicTacToe';

export const GameContext = createContext<{
  game: ITicTacToe
}>({
  game: new TicTacToe()
});
GameContext.displayName = 'GameContext';