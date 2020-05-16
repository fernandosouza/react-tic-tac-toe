import Player from './Player';

interface PlayerManagerError {
  code: string
}

/**
 * Manages players providing a public API for adding players and sets which one 
 * is in the turn.
 **/
class PlayersManager {
  private erros_: PlayerManagerError[] = [];
  private players_: Player[] = [];
  private currentPlayerIndex_ = 0;

  constructor(players = []) {
    this.createPlayers_(players);
  }

  /**
   * Adds a single player to the array of players by crating a new Player
   * instance.
   * @param {String} playerName The player data to create a new Player instance.
   **/
  addPlayer(playerName: string) {
    if (!playerName) {
      throw Error('Player configuration should be informed');
    }
    const player = {
      name: playerName,
      id: this.players_.length + 1,
      class: 'player' + this.players_.length + 1
    };
    this.players_.push(new Player(player));
  }

  /**
   * Checks if there are erros regarding players.
   * @returns {Array} Array of errors
   **/
  checkErros() {
    this.erros_ = [];
    if (!this.players_.length) {
      this.erros_.push({ code: 'no_players' });
      return this.erros_;
    }
    if (
      this.players_[0].name.toLowerCase() ===
      this.players_[1].name.toLowerCase()
    ) {
      this.erros_.push({ code: 'duplicated_names' });
    }
    return this.erros_;
  }

  /**
   * Method used by the class constructor to create fill the initial list of
   * players.
   * @param {Array<Object>} players A array of players data.
   * @private
   **/
  createPlayers_(players: Player[]) {
    this.players_ = players.map(player => {
      return new Player(player);
    });
  }

  /**
   * Returns the current player.
   * @returns {Object} Player
   **/
  getCurrentPlayer() {
    return this.players_[this.currentPlayerIndex_];
  }

  /**
   * Returns the list of players.
   * @returns {Array<Object>} The list of players
   **/
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
  switchPlayer(index: number) {
    if (index !== 0 && this.players_.length < index) {
      throw Error('Player not found');
    }
    this.currentPlayerIndex_ = index;
    return this.players_[index];
  }
}

export default PlayersManager;
