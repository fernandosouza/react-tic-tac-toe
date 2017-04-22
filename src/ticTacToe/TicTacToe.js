import PlayersManager from '../playersManager/PlayersManager';
import { isFunction } from 'underscore';

class TicTacToe {
  constructor(playerOne, playerTwo, onGameEnd) {
    this.board_ = new Map();
    this.playersManager_ = new PlayersManager([
      {
        id: 1,
        name: playerOne,
        class: 'player1'
      },
      {
        id: 2,
        name: playerTwo,
        class: 'player2'
      }
    ]);
    this.onGameEnd = onGameEnd;
    this.currentPlayer_ = this.playersManager_.getCurrentPlayer();
  }

  /**
   * Walks through Board column looking for unmatched slots in order to 
   * determine if the current player got a column matching. Returns true if 
   * it has, otherwise returns false.
   * @param {Number} column The Column index.
   * @private 
   **/
  checkColumns_(playerId) {
    return (
      (this.checkSlot_(0, playerId) && this.checkSlot_(3, playerId) 
        && this.checkSlot_(6, playerId)) ||
      (this.checkSlot_(1, playerId) && this.checkSlot_(4, playerId) 
        && this.checkSlot_(7, playerId)) ||
      (this.checkSlot_(2, playerId) && this.checkSlot_(5, playerId) 
        && this.checkSlot_(8, playerId))
    );
  }

  /**
   * Checks if the diagonal line starting from the top-left slot has been 
   * fulfilled by the current player.
   * @returns {boolean} Returns true if the diagonal line has been fulfilled by 
   * a player, otherwise, false.
   * @private
   **/
  checkDiagonalUpLeft_(playerId) {
    return (
      this.checkSlot_(0, playerId) && 
      this.checkSlot_(4, playerId) &&
      this.checkSlot_(8, playerId)
    );
  }

  /**
   * Checks if the diagonal line starting from the top-right slot has been 
   * fulfilled by the current player.
   * @returns {boolean} Returns true if the diagonal line has been fulfilled by 
   * a player, otherwise, false.
   * @private
   **/
  checkDiagonalUpRight_(playerId) {
    return (
      this.checkSlot_(2, playerId) &&
      this.checkSlot_(4, playerId) && 
      this.checkSlot_(6, playerId)
    );
  }

  /**
   * Walks through Board lines looking for unmatched slots in order to 
   * determine if the current player got a line matching. Returns true if 
   * it has, otherwise returns false.
   * @param {Number} line The Line index.
   * @private 
   **/
  checkLines_(playerId) {
    return (
      (this.checkSlot_(0, playerId) && this.checkSlot_(1, playerId) 
        && this.checkSlot_(2, playerId)) ||
      (this.checkSlot_(3, playerId) && this.checkSlot_(4, playerId) 
        && this.checkSlot_(5, playerId)) ||
      (this.checkSlot_(6, playerId) && this.checkSlot_(7, playerId) 
        && this.checkSlot_(8, playerId))
    );
  }

  /**
   * Checks if the slot was filled by an given player.
   * @param {Object|undefined} winner The user who won the game.
   * @private
   **/
  checkSlot_(index, currentPlayerId) {
    return this.board_.get(index) === currentPlayerId;
  }

  /**
   * Calls the onGameEnd listener callback with the winner's instance.
   * @param {Object|undefined} winner The user who won the game.
   * @private
   **/
  endGame_(winner) {
    if (isFunction(this.onGameEnd)) {
      this.onGameEnd(winner);
    }
  }

  /**
   * Fills a specific board slot and also checks if there is a winner, 
   * if it has, do not call the next game turn and end the game.
   * @param {Number} index the slot index.
   **/
  fillSlot(index) {
    if (this.board_.get(index)) {
      return;
    }

    if (this.board_.size < 9) {
      let currentPlayer = this.currentPlayer_;
      this.board_.set(index, currentPlayer.id);
    }

    let winner = this.getWinner_();

    if (winner || this.board_.size === 9) {
      this.endGame_(winner);
    }
    else {
      this.currentPlayer_ = this.playersManager_.nextPlayerTurn();
    }
  }

  /**
   * Logic to determine if a given slot is valid or not based on players. 
   * There is only two invalid cases. If the slot is empty or if the slot 
   * content doesn't match with the reference of the current player.
   * @returns {Array<Number>} The game board.
   **/
  getBoard() {
    return this.board_;
  }

  /**
   * Checks all the possibilities of have a winner and return the Player instance.
   * @returns {Object|undefined} Returns the currentPlayer if a winner is found
   * @private 
   **/
  getWinner_() {
    let playerId = this.currentPlayer_.id;
    let hasWinner = this.checkLines_(playerId) || this.checkColumns_(playerId) || 
      this.checkDiagonalUpLeft_(playerId) ||
      this.checkDiagonalUpRight_(playerId);

    if (hasWinner) {
      return this.currentPlayer_;
    }
  }
}

export default TicTacToe;
