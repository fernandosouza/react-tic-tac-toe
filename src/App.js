import React, { Component } from 'react';
import Board from './board/Board';
import TicTacToe from './ticTacToe/TicTacToe';
import Storage from './storage/Storage';
import { Link } from 'react-router-dom'
import './App.css';

/**
 * Initialize the game asking for players information. Manage players
 * turns and set in the board filled slots.
 * @author Fernando Souza nandosouzafilho@gmail.com
 **/
class App extends Component {
  constructor(prop) {
    super(prop);
    
    this.state = {
      filledSlots: []
    }

    let { firstPlayer, secondPlayer } = this.props.match.params;
    this.game_ = new TicTacToe(firstPlayer, secondPlayer, this.onGameEnd_.bind(this));
    this.storage_ = new Storage('gameLeaderBoard');
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
      this.props.history.push(`/leaderboard/${winner.name}`);
    }
  }

  /**
   * Handles the click event on the each slot and updates the filledSlots
   * state.
   * the turn to the next player.
   * @param {Number} key The Board Slot index.
   * @private 
   **/
  onSlotClick_(key) {
    this.game_.fillSlot(key);
    this.setState({
      filledSlots: this.game_.getBoard()
    });
  }

  /**
   * @inheritdoc
   **/
  render() {
    return (
      <div className="tic-tac-toe-app">
        <Board
          filledSlots={this.state.filledSlots}
          onSlotClick={this.onSlotClick_.bind(this)} />

          <Link className="button new-game-button" to="/">New game</Link>
      </div>
    )
  }
}

export default App;
