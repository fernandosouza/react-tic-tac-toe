import PlayersManager from '../ticTacToe/PlayersManager';
import { isFunction } from 'underscore';

class TicTacToe {
  onGameEnd;

  constructor(playerOne, playerTwo, onGameEnd) {
    this.board_ = new Map();
    this.onGameEnd = onGameEnd;
    this.playersManager_ = new PlayersManager();
    if (playerOne && playerTwo) {
      this.playersManager_.addPlayer(playerOne);
      this.playersManager_.addPlayer(playerTwo);
    }
  }

  checkSlots_(slots, playerId) {
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
  checkColumns_(playerId) {
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
  checkDiagonalUpLeft_(playerId) {
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
  checkDiagonalUpRight_(playerId) {
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
  checkLines_(playerId) {
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
  checkSlot_(index, currentPlayerId) {
    return this.board_.get(index) === currentPlayerId;
  }

  /**
   * Calls the onGameEnd listener callback with the winner's instance.
   * @param {Object|undefined} winner The user who won the game.
   **/
  onEndGame_(winner) {
    if (isFunction(this.onGameEnd)) {
      return this.onGameEnd(winner);
    }
  }

  /**
   * Fills a specific board slot and also checks if there is a winner,
   * if it has, do not call the next game turn and end the game.
   * @param {Number} index the slot index.
   **/
  fillSlot(index) {
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
      this.onEndGame_(winner);
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
  getWinner_() {
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
