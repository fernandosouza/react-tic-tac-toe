import React, { Component } from 'react';
import Board from './board/Board';
import PlayersManager from './playersManager/PlayersManager';
import './App.css';

/**
 * Initialize the game asking for players information. Manage players
 * turns and set in the board fulfilled slots.
 * @author Fernando Souza nandosouzafilho@gmail.com
 **/
class App extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      fulfileedSlots: []
    };

    this.playerManager_ = new PlayersManager([
      {
        name: 'Player 1',
        class: 'player1'
      },
      {
        name: 'Player 2',
        class: 'player2'
      }
    ]);
  }
  
  /**
   * Abstracts the creation of a fulfilled slot by getting the player unique
   * reference and setting it as a CSS class to the slot.
   * @returns {Object} An object that has a fulfilledClass property that takes the 
   * player unique reference.
   * @private 
   **/
  createFulfilledSlot_() {
    let currentPlayer = this.playerManager_.getCurrentPlayer();
    return {
      fulfilledClass: currentPlayer.class
    }
  }

  /**
   * Updates the list of fulfelled slots.
   * @param {Number} key The Board Slot index to be fufilled.
   * @private 
   **/
  fillSlot_(key) {
    let fulfileedSlots = [...this.state.fulfileedSlots];
    fulfileedSlots[key] = this.createFulfilledSlot_();
    this.setState({
      fulfileedSlots: fulfileedSlots
    });
  }

  /**
   * Handles the click event on the each slot, checks if it's empty and if so, 
   * fill it with the information of the current player. After that, changes 
   * the turn to the next player.
   * @param {Number} key The Board Slot index.
   * @private 
   **/
  onSlotClick_(key) {
    if (this.state.fulfileedSlots[key]) {
      return;
    }
    this.fillSlot_(key);
    this.playerManager_.nextPlayerTurn();
  }

  render() {
    return <Board slots={this.state.fulfileedSlots} onSlotClick={this.onSlotClick_.bind(this)} />;
  }
}

export default App;
