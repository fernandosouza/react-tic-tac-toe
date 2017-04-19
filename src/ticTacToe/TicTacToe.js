import PlayersManager from '../playersManager/PlayersManager';

class TicTacToe {
  constructor() {
    this.board_ = [];

    this.playersManager_ = new PlayersManager([
      {
        id: 1,
        name: 'Player 1',
        class: 'player1'
      },
      {
        id: 2,
        name: 'Player 2',
        class: 'player2'
      }
    ]);
  }

  /**
   * Walks through Board column looking for unmatched slots in order to 
   * determine if the current player got a column matching. Returns true if 
   * it has, otherwise returns false.
   * @param {Number} column The Column index.
   * @private 
   **/
  checkColumn_(column) {
    for (let j = column; j < column + 9; j += 3) {
      if (this.checkUnMatch_(j)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Walks through Board lines looking for unmatched slots in order to 
   * determine if the current player got a line matching. Returns true if 
   * it has, otherwise returns false.
   * @param {Number} line The Line index.
   * @private 
   **/
  checkLine_(line) {
    for (let j = line; j < line + 3; j++) {
      if (this.checkUnMatch_(j)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Logic to determine if a given slot is valid or not based on players. 
   * There is only two invalid cases. If the slot is empty or if the slot 
   * content doesn't match with the reference of the current player .
   * @param {Number} slotIndex The slot index.
   * @private 
   **/
  checkUnMatch_(slotIndex) {
    let currentPlayer = this.playersManager_.getCurrentPlayer();
    return (!this.board_[slotIndex] || this.board_[slotIndex] !== currentPlayer.id)
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
   * Fill a specific board slot. It also checks if there is a winner and if 
   * it has not calls the next game turn.
   * @param {Number} index the slot index.
   **/
  fillSlot(index) {
    if (this.board_[index]) {
      return;
    }

    let currentPlayer = this.playersManager_.getCurrentPlayer();
    this.board_[index] = currentPlayer.id;

    if (this.findWinner_()) {
      console.log('We have a winner!');
    }
    else {
      this.playersManager_.nextPlayerTurn();
    }
  }

  /**
   * Checks all the possibilities of have a winner.
   * @private 
   * @returns {boolean} Returns true if the game has a winner, otherwise, false.
   **/
  findWinner_() {
    return this.visitLines_() || this.visitColumns_() || 
      this.visitDiagonalUpLeft_() ||
      this.visitDiagonalUpRight_();
  }

  /**
   * Walks through all Board columns looking for a matched one. 
   * @private
   * @returns {boolean} Returns true if any column has been fulfilled by a player, 
   * otherwise, false.
   **/
  visitColumns_() {
    for (let i = 0; i < 3; i++) {
      if (this.checkColumn_(i)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if the diagonal line starting from the top-left slot has been 
   * fulfilled by the current player.
   * @private
   * @returns {boolean} Returns true if the diagonal line has been fulfilled by 
   * a player, otherwise, false.
   **/
  visitDiagonalUpLeft_() {
    for (let i = 0; i < 9; i += 4) {
      if (this.checkUnMatch_(i)) {
        return false;
      }
    }
    return true;
  }
  
  /**
   * Checks if the diagonal line starting from the top-right slot has been 
   * fulfilled by the current player.
   * @private
   * @returns {boolean} Returns true if the diagonal line has been fulfilled by 
   * a player, otherwise, false.
   **/
  visitDiagonalUpRight_() {
    for (let i = 2; i < 7; i += 2) {
      if (this.checkUnMatch_(i)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Walks through all Board lines looking for a matched one. 
   * @private
   * @returns {boolean} Returns true if any column has been fulfilled by a player, 
   * otherwise, false.
   **/
  visitLines_(callBack) {
    for (let i = 0; i < 9; i += 3) {
      if (this.checkLine_(i)) {
        return true;
      }
    }
    return false;
  }
}

export default TicTacToe;
