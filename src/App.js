import React, { Component } from 'react';
import Board from './board/Board';
import Storage from './storage/Storage';
import { Link } from 'react-router-dom';
import './App.scss';
import { GameContext } from './GameContext';

/**
 * Initialize the game asking for players information. Manage players
 * turns and set in the board filled slots.
 * @author Fernando Souza nandosouzafilho@gmail.com
 **/
class App extends Component {
  static contextType = GameContext;

  constructor(props) {
    super(props);

    this.state = {
      filledSlots: null,
      winnerSlots: []
    };
    this.storage_ = new Storage();
  }

  componentDidMount() {
    if (this.hasNoPlayers_()) {
      this.setPlayersFromURL_();
    }

    this.setState({
      filledSlots: new Map(this.context.game.getBoard())
    });
  }

  /**
   * Uses url parameters to create players.
   * @private
   **/
  setPlayersFromURL_() {
    const { firstPlayer, secondPlayer } = this.props.match.params;
    this.context.game.playersManager_.addPlayer(firstPlayer);
    this.context.game.playersManager_.addPlayer(secondPlayer);
  }

  /**
   * Checks if players was not already defined.
   * @returns {Boolean}
   * @private
   **/
  hasNoPlayers_() {
    return this.context.game.playersManager_
      .checkErros()
      .some(error => error.code === 'no_players');
  }

  /**
   * @inheritdoc
   **/
  render() {
    const leaderboardMessage = () => {
      if (this.state.winner) {
        return (
          <p className="winner-message">
            Congratulations {this.state.winner.player.name}. <Link to="/leaderboard">
              See leaderboard
            </Link>
          </p>
        );
      }
    }

    return (
      <>
        <Board />

        <Link className="button new-game-button" to="/">
          New game
        </Link>

        <div className="app-footer">
          {leaderboardMessage()}
        </div>
      </>
    );
  }
}

export default App;
