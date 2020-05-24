import React, { Component } from 'react';
import Board from './board/Board';
import Storage from './storage/Storage';
import { Link } from 'react-router-dom';
import './App.scss';
import { GameContext } from './GameContext';
import { Slots, WinnerSlots, GameErrors } from './ticTacToe/TypesAndInterfaces';

/**
 * Initialize the game asking for players information. Manage players
 * turns and set in the board filled slots.
 * @author Fernando Souza nandosouzafilho@gmail.com
 **/
class App extends Component<any, { winner: any, filledSlots: Slots | null, winnerSlots: WinnerSlots | null }> {
  static contextType = GameContext;
  private storage_ = new Storage();

  constructor(props: any) {
    super(props);

    this.state = {
      winner: null,
      filledSlots: null,
      winnerSlots: null
    };
  }

  componentDidMount() {
    if (this.checkErrors_()) {
      this.setPlayersFromURL_();
    }
  }

  /**
   * Uses url parameters to create players.
   * @private
   **/
  setPlayersFromURL_() {
    const { firstPlayer, secondPlayer } = this.props.match.params;
    this.context.game.playersManager.addPlayer(firstPlayer);
    this.context.game.playersManager.addPlayer(secondPlayer);
  }

  /**
   * Checks if players was not already defined.
   * @returns {Boolean}
   * @private
   **/
  checkErrors_() {
    return this.context.game.checkErrors().some((error: GameErrors) => error.code === 'no_players');
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
