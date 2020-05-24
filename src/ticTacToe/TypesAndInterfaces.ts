import { GameEventEmitter } from './EventEmitter';

export type Player = {
  id: PlayerId;
  name: string;
};

export type WinnerSlots = { player: Player, slots: Slots };
export type SlotId = number;
export type PlayerId = number;

export type Board = PlayerId[] | null[];
export type Slots = SlotId[];
export type GameErrors = { code: string };

export interface EventEmitter {
  on: Function,
  off: Function
};

export interface TicTacToeGame extends GameEventEmitter {
  fillSlot: (slotId: SlotId) => void
  getBoard: () => Board
  checkErrors: () => GameErrors[]
  clearBoard(): void
};
