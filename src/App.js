import React, { Component } from 'react';
import Board from './board/Board';
import Storage from './storage/Storage';
import { Link } from 'react-router-dom'
import './App.css';

/**
 * Initialize the game asking for players information. Manage players
 * turns and set in the board filled slots.
 * @author Fernando Souza nandosouzafilho@gmail.com
 **/
class App extends Component {
  constructor(props) {
    super(props);

    if (this.hasNoPlayers_()) {
      this.setPlayersFromURL_();
    }

    this.state = {
      filledSlots: new Map(),
      winnerSlots: []
    };
    this.props.game.onGameEnd = this.onGameEnd_.bind(this);
    this.storage_ = new Storage('gameLeaderBoard');
  }

  /**
   * Uses url parameters to create players
   * @private
   **/
  setPlayersFromURL_() {
    const { firstPlayer, secondPlayer } = this.props.match.params;
    this.props.game.playersManager_.addPlayer(firstPlayer);
    this.props.game.playersManager_.addPlayer(secondPlayer);
  }

  /**
   * Checks if players was not already defined.
   * @returns {Boolean}
   * @private
   **/
  hasNoPlayers_() {
    return this.props.game.playersManager_
      .checkErros()
      .some(error => error.code === 'no_players');
  }

  /**
   * Callback method that will be called when the game is finished. It updates
   * the local storage with the new winner and go to the Leaderboard page.
   * @param {Object} winner The Player object.
   * @private
   **/
  onGameEnd_(winner) {
    if (winner) {
      let gameLeaderBoard = this.storage_.getData();
      this.storage_.update([winner.name, ...gameLeaderBoard]);
      this.setState({
        winnerSlots: winner.slots
      });
    }
  }

  /**
   * Handles the click event on the each slot and updates the filledSlots
   * state.
   * the turn to the next player.
   * @param {Number} index The Board Slot index.
   * @private
   **/
  onSlotClick_(index) {
    if (this.state.winnerSlots.length > 0) {
      return;
    }
    this.props.game.fillSlot(index);
    this.setState({
      filledSlots: this.props.game.getBoard()
    });
  }

  /**
   * @inheritdoc
   **/
  render() {
    return (
      <div className="tic-tac-toe-app">
        <Board
          winnerSlots={this.state.winnerSlots}
          filledSlots={this.state.filledSlots}
          onSlotClick={this.onSlotClick_.bind(this)}
        />

        <Link className="button new-game-button" to="/">
          New game
        </Link>
      </div>
    );
  }
}

export default App;
