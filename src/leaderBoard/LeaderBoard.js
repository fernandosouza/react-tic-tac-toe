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
    let storage = new Storage().getData();
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
      return (
        <div>
          <p>
            We do not have leaders to how.
            Why don't you <Link to="/">play</Link> to see if you can put 
            your name here?
          </p>
          <Link to="/">New game</Link>
        </div>
      )
    }

    return (
      <div>
        <p>
          Congratulations, <strong>{winner}</strong>!!!
          Now you are in our leaderboard.
        </p>

        <p>
          Are you ready to <a href="#" onClick={this.props.history.goBack}>
          play again</a> aganst you partner or start a 
          <Link to="/">new game</Link>?
        </p>
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
