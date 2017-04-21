import React, { Component } from 'react';
import Storage from '../storage/Storage';

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
   * @inheritdoc
   */
  render() {
    let leaderBoard = this.state.leaderBoard.reverse();
    return (
      <div>
        <h1>Congratulations, {leaderBoard[0]}</h1>
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
