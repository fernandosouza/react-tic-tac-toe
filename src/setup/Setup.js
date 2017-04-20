import React, { Component } from 'react';

/**
 * Component responsible for getting players` name and passes it to the parent 
 * component through a function named `onFinishSetup` in prop.
 **/
class Setup extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
    }
  }

  /**
   * Listens to the form submission and informs the players` name to the
   * parent component.
   * @param {event} event The event object
   * @private 
   **/
  onFormSubmit_(event) {
    event.preventDefault();
    let { playerOneName, playerTwoName } = this.state;
    if (playerOneName && playerTwoName) {
      this.props.onFinishSetup(playerOneName, playerTwoName);
    }
  }

  /**
   * Stores the first player's name in the state object.
   * @param {event} event The event object
   * @private 
   **/
  onPlayerOneNameChange_(event) {
    this.setState({
      playerOneName: event.target.value
    });
  }
  
  /**
   * Stores the second player's name in the state object.
   * @param {event} event The event object
   * @private 
   **/
  onPlayerTwoNameChange_(event) {
    this.setState({
      playerTwoName: event.target.value
    });
  }

  /**
   * @inheritdoc
   **/
  render() {
    return (
      <form onSubmit={this.onFormSubmit_.bind(this)}>
        <label htmlFor="playerOne">Player 1 - Name</label>
        <input
          type="text"
          value={this.state.playerOneName}
          onChange={this.onPlayerOneNameChange_.bind(this)}
          id="playerOne" />

        <label htmlFor="playerTwo">Player 2 - Name</label>
        <input
          type="text"
          value={this.state.playerTwoName}
          onChange={this.onPlayerTwoNameChange_.bind(this)}
          id="playerTwo" />

          <button> Start! </button>
      </form>
    );
  }
}

export default Setup;