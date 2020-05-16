import PlayersManager from './PlayersManager';
import Player from './Player';

export type EventTypes = 'gameEnd';
export type WinnerSlots = { player: Player, slots: any }

class EventEmiiter {
  private subscribers: Map<EventTypes, Function[]>;

  constructor() {
    this.subscribers = new Map();
  }

  on(event: EventTypes, fn: Function) {
    if (!this.subscribers.get(event)) {
      this.subscribers.set(event, []);
    }

    this.subscribers.get(event)!.push(fn);
  }

  off(event: EventTypes, fn: Function) {
    if (this.subscribers.get(event)) {
      this.subscribers.set(event, this.subscribers.get(event)!.filter(subscribed => fn !== subscribed));
    }
  }

  dispatch(event: EventTypes, arg: any) {
    if (this.subscribers.get(event)) {
      this.subscribers.get(event)!.forEach(fn => fn.call(null, arg));
    }
  }
}

class TicTacToe extends EventEmiiter {
  private board_: Map<any, any>;
  private playersManager_: PlayersManager;

  constructor(playerOne?: string, playerTwo?: string) {
    super();
    this.board_ = new Map();
    this.playersManager_ = new PlayersManager();
    if (playerOne && playerTwo) {
      this.playersManager_.addPlayer(playerOne);
      this.playersManager_.addPlayer(playerTwo);
    }
  }

  checkSlots_(slots: number[], playerId: number) {
    if (slots.length < 3) {
      return;
    }

    if (
      this.checkSlot_(slots[0], playerId) &&
      this.checkSlot_(slots[1], playerId) &&
      this.checkSlot_(slots[2], playerId)
    ) {
      return slots;
    }
  }

  /**
   * Checks if there is any matched column by a given player.
   * @param {Number} playerId The player id to be checked.
   * @returns {boolean} Returns true if a matched column is found, otherwise
   * it returns false.
   * @private
   **/
  checkColumns_(playerId: number) {
    return (
      this.checkSlots_([0, 3, 6], playerId) ||
      this.checkSlots_([1, 4, 7], playerId) ||
      this.checkSlots_([2, 5, 8], playerId)
    );
  }

  /**
   * Checks if the diagonal line starting from the top-left slot has been
   * filled by the current player.
   * @param {Number} playerId The player id to be checked.
   * @returns {boolean} Returns true if the diagonal line has been filled by
   * a player, otherwise, false.
   * @private
   **/
  checkDiagonalUpLeft_(playerId: number) {
    return this.checkSlots_([0, 4, 8], playerId);
  }

  /**
   * Checks if the diagonal line starting from the top-right slot has been
   * filled by the current player.
   * @param {Number} playerId The player id to be checked.
   * @returns {boolean} Returns true if the diagonal line has been filled by
   * a player, otherwise, false.
   * @private
   **/
  checkDiagonalUpRight_(playerId: number) {
    return this.checkSlots_([2, 4, 6], playerId);
  }

  /**
   * Walks through Board lines looking for unmatched slots in order to
   * determine if the current player got a line matching. Returns true if
   * it has, otherwise returns false.
   * @param {Number} playerId The player id to be checked
   * @returns {boolean} Returns true if a matched line is found, otherwise, false.
   * @private
   **/
  checkLines_(playerId: number) {
    return (
      this.checkSlots_([0, 1, 2], playerId) ||
      this.checkSlots_([3, 4, 5], playerId) ||
      this.checkSlots_([6, 7, 8], playerId)
    );
  }

  /**
   * Checks if the slot was filled by an given player.
   * @param {Number} index The slot index.
   * @param {Number} currentPlayerId The player id.
   * @private
   **/
  checkSlot_(index: Number, currentPlayerId: number) {
    return this.board_.get(index) === currentPlayerId;
  }

  /**
   * Fills a specific board slot and also checks if there is a winner,
   * if it has, do not call the next game turn and end the game.
   * @param {Number} index the slot index.
   **/
  fillSlot(index: Number) {
    let currentPlayer_ = this.playersManager_.getCurrentPlayer();
    if (this.board_.get(index)) {
      return;
    }

    if (this.board_.size < 9) {
      let currentPlayer = currentPlayer_;
      this.board_.set(index, currentPlayer.id);
    }

    let winner = this.getWinner_();

    if (winner || this.board_.size === 9) {
      this.dispatch('gameEnd', winner);
    } else {
      this.playersManager_.nextPlayerTurn();
    }
  }

  /**
   * Returns the list of filled slots.
   * @returns {Map<Object>} The game board.
   **/
  getBoard() {
    return this.board_;
  }

  clearBoard() {
    this.board_.clear();
  }

  /**
   * Checks all the possibilities of have a winner and return the Player instance.
   * @returns {Object|undefined} Returns the currentPlayer if a winner is found
   * @private
   **/
  getWinner_(): WinnerSlots | undefined {
    let currentPlayer = this.playersManager_.getCurrentPlayer();
    let playerId = currentPlayer.id;
    let hasWinner =
      this.checkLines_(playerId) ||
      this.checkColumns_(playerId) ||
      this.checkDiagonalUpLeft_(playerId) ||
      this.checkDiagonalUpRight_(playerId);

    if (hasWinner) {
      return {
        player: currentPlayer,
        slots: hasWinner
      };
    }
  }
}

export default TicTacToe;
