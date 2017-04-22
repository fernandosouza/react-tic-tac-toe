import React, { Component } from 'react';
import Storage from '../storage/Storage';
import { Link } from 'react-router-dom'
import './leader-board.css';

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @inheritdoc
   */
  componentWillMount() {
    let storage = new Storage('gameLeaderBoard').getData();
    this.setState({
      leaderBoard: storage
    });
  }

  /**
   * Renders winner congratulation message.
   * @private 
   */
  renderWinnerMessage_() {    
    let  { winner } = this.props.match.params;

    if (!winner) {
      return<Link to="/">New game</Link>
    }

    return (
      <div>
        <p>
          Congratulations, <strong>{winner}</strong>!!!
          Now you are in our leaderboard.
        </p>

        <p>Are you ready to <a href="" onClick={this.props.history.goBack}>
            play again</a> aganst you partner or start a <Link to="/">
            new game</Link>?</p>
      </div>
    );
  }

  /**
   * @inheritdoc
   */
  render() {
    let leaderBoard = this.state.leaderBoard;
    return (
      <div className="leader-board">
        <h1>Leaderboard</h1>
        {this.renderWinnerMessage_()}
        <ul>
        {leaderBoard.map((leader, key) => {
          return <li key={key}>{leader}</li>
        })}
        </ul>
      </div>
    );
  }
}

export default LeaderBoard
