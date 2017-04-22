import Player from '../player/Player';

/**
 * Manages players providing a public API for adding players and sets which one 
 * is in the turn.
 **/
class PlayersManager {
  constructor(players = []) {
    this.createPlayers_(players);
    this.currentPlayerIndex_ = 0;
  }

  /**
   * Adds a single player to the array of players by crating a new Player
   * instance.
   * @param {Object} player The player data to create a new Player instance.
   **/
  addPlayer(player) {
    if (!player) {
      throw Error('Player configuration should be informed');
    }
    this.players_.push(new Player(player));
  }

  /**
   * Method used by the class constructor to create fill the initial list of
   * players.
   * @param {Array<Object>} players A array of players data.
   * @private 
   **/
  createPlayers_(players) {
    this.players_ = players.map(player => {
      return new Player(player);
    });
  }

  getCurrentPlayer() {
    return this.players_[this.currentPlayerIndex_];
  }

  getPlayers() {
    return [...this.players_];
  }

  /**
   * Changes the game turn to the next available player. Select the first player
   * of the array if no next one is found.
   **/
  nextPlayerTurn() {
    let currentPlayerIndex = this.currentPlayerIndex_;
    currentPlayerIndex++;

    if (currentPlayerIndex >= this.players_.length) {
      currentPlayerIndex = 0;
    }

    return this.switchPlayer(currentPlayerIndex);
  }

  /**
   * Changes the current player by providing its index.
   * @param {number} index The player index.
   **/
  switchPlayer(index) {
    if (index !== 0 && this.players_.length < index) {
      throw Error('Player not found');
    }
    this.currentPlayerIndex_ = index;
    return this.players_[index];
  }
}

export default PlayersManager;
