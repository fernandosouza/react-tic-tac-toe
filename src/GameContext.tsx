import { createContext } from 'react';
import TicTacToe from './ticTacToe/TicTacToe';
import { TicTacToeGame } from './ticTacToe/TypesAndInterfaces';

export const GameContext = createContext<{
  game: TicTacToeGame
}>({
  game: new TicTacToe()
});
GameContext.displayName = 'GameContext';