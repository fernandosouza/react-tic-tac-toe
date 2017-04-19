import React, { Component } from 'react';
import Board from './board/Board';
import TicTacToe from './ticTacToe/TicTacToe';
import './App.css';

/**
 * Initialize the game asking for players information. Manage players
 * turns and set in the board fulfilled slots.
 * @author Fernando Souza nandosouzafilho@gmail.com
 **/
class App extends Component {
  constructor(prop) {
    super(prop);

    this.game_ = new TicTacToe();

    this.state = {
      fulfileedSlots: []
    };
  }

  /**
   * Handles the click event on the each slot, checks if it's empty and if so, 
   * fill it with the information of the current player. After that, changes 
   * the turn to the next player.
   * @param {Number} key The Board Slot index.
   * @private 
   **/
  onSlotClick_(key) {
    this.game_.fillSlot(key);
    this.setState({
      fulfileedSlots: this.game_.getBoard()
    });
  }

  render() {
    return <Board slots={this.state.fulfileedSlots} onSlotClick={this.onSlotClick_.bind(this)} />;
  }
}

export default App;
