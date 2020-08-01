import React, { Component, ContextType } from 'react';
import Board from './board/Board';
import Storage from './storage/Storage';
import { Link } from 'react-router-dom';
import './App.scss';
import { GameContext } from './GameContext';
import Player from './ticTacToe/Player';
import { GameBoard } from './ticTacToe/TicTacToe';

interface AppProps {
  match: {
    params: {
      firstPlayer: string,
      secondPlayer: string
    }
  }
}
interface AppState {
  winner: {
    player: Player | null
  },
  filledSlots: GameBoard | null
  winnerSlots: Player[] | null
}

/**
 * Initialize the game asking for players information. Manage players
 * turns and set in the board filled slots.
 * @author Fernando Souza nandosouzafilho@gmail.com
 **/
// ITicTacToe
class App extends Component<AppProps, AppState> {
  static contextType = GameContext;
  context!: ContextType<typeof GameContext>;
  private storage: Storage;

  constructor(props: AppProps) {
    super(props);

    this.state = {
      winner: {
        player: null
      },
      filledSlots: null,
      winnerSlots: []
    };
    this.storage = new Storage();
  }

  componentDidMount() {
    if (this.hasNoPlayers_()) {
      this.setPlayersFromURL_();
    }

    this.setState({
      filledSlots: this.context.game.getBoard()
    });
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
  hasNoPlayers_() {
    return this.context.game.playersManager
      .checkErros()
      .some(error => error.code === 'no_players');
  }

  /**
   * @inheritdoc
   **/
  render() {
    const leaderboardMessage = () => {
      if (this.state.winner.player) {
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
