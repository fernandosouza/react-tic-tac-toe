import React, { createContext } from 'react';
import TicTacToe from './ticTacToe/TicTacToe';

export const GameContext = createContext<{
  game: TicTacToe | null
}>({
  game: null
});
GameContext.displayName = 'GameContext';

export function GameContextProvider({ children }: any) {
  return <GameContext.Provider value={{ game: new TicTacToe() }}>
    {children}
  </GameContext.Provider>
}