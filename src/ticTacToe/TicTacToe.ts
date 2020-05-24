import PlayersManager from './PlayersManager';
import { GameEventEmitter } from './EventEmitter';
import { Slots, PlayerId, SlotId, GameErrors, WinnerSlots, Board, TicTacToeGame } from './TypesAndInterfaces';

class TicTacToe extends GameEventEmitter implements TicTacToeGame {
  private board: Board = Array(9).fill(null, 0, 9);
  private playersManager: PlayersManager = new PlayersManager();

  constructor(playerOneName?: string, playerTwoName?: string) {
    super();
    if (playerOneName && playerTwoName) {
      this.playersManager.addPlayer(playerOneName);
      this.playersManager.addPlayer(playerTwoName);
    }
  }

  private checkSlots(slots: Slots, playerId: PlayerId): Slots | undefined {
    if (
      this.checkSlot(slots[0], playerId) &&
      this.checkSlot(slots[1], playerId) &&
      this.checkSlot(slots[2], playerId)
    ) {
      return slots;
    }
  }

  /**
   * Checks if there is any matched column by a given player.
   **/
  private checkColumns(playerId: PlayerId): Slots | undefined {
    return (
      this.checkSlots([0, 3, 6], playerId) ||
      this.checkSlots([1, 4, 7], playerId) ||
      this.checkSlots([2, 5, 8], playerId)
    );
  }

  /**
   * Checks if the diagonal line starting from the top-left slot has been
   * filled by the current player.
   **/
  private checkDiagonalUpLeft(playerId: PlayerId): Slots | undefined {
    return this.checkSlots([0, 4, 8], playerId);
  }

  /**
   * Checks if the diagonal line starting from the top-right slot has been
   * filled by the current player.
   **/
  private checkDiagonalUpRight(playerId: PlayerId): Slots | undefined {
    return this.checkSlots([2, 4, 6], playerId);
  }

  /**
   * Walks through Board lines looking for unmatched slots in order to
   * determine if the current player got a line matching. Returns true if
   * it has, otherwise returns false.
   **/
  private checkLines(playerId: PlayerId): Slots | undefined {
    return (
      this.checkSlots([0, 1, 2], playerId) ||
      this.checkSlots([3, 4, 5], playerId) ||
      this.checkSlots([6, 7, 8], playerId)
    );
  }

  /**
   * Checks if the slot was filled by an given player.
   **/
  private checkSlot(slotId: SlotId, currentPlayerId: PlayerId): boolean {
    return this.board[slotId] === currentPlayerId;
  }

  /**
   * Fills a specific board slot and also checks if there is a winner,
   * if it has, do not call the next game turn and end the game.
   **/
  fillSlot(slotId: SlotId): void {
    let currentPlayer_ = this.playersManager.getCurrentPlayer();
    if (this.board[slotId] || this.getWinner()) {
      return;
    }

    if (this.getFilledSlots().length < 9) {
      let currentPlayer = currentPlayer_;
      this.board[slotId] = currentPlayer.id;
    }

    let winner = this.getWinner();

    if (winner || this.getFilledSlots().length === 9) {
      this.dispatch('gameEnd', winner);
    } else {
      this.playersManager.nextPlayerTurn();
    }
  }

  private getFilledSlots() {
    //@ts-ignore
    return this.board.filter((value: number | null) => value !== null);
  }

  /**
   * Returns the list of filled slots.
   **/
  getBoard(): Board {
    return this.board;
  }

  clearBoard(): void {
    this.board = Array(9).fill(null, 0, 9);
  }

  checkErrors(): GameErrors[] {
    return this.playersManager.checkErros();
  }

  /**
   * Checks all the possibilities of have a winner and return the Player instance.
   **/
  private getWinner(): WinnerSlots | undefined {
    let currentPlayer = this.playersManager.getCurrentPlayer();
    let playerId = currentPlayer.id;
    let hasWinner =
      this.checkLines(playerId) ||
      this.checkColumns(playerId) ||
      this.checkDiagonalUpLeft(playerId) ||
      this.checkDiagonalUpRight(playerId);

    if (hasWinner) {
      return {
        player: currentPlayer,
        slots: hasWinner
      };
    }
  }
}

export default TicTacToe;
