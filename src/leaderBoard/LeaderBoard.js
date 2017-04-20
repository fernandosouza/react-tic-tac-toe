import React, { Component } from 'react';

class LeaderBoard extends Component {
  render() {
    let leaderBoard = this.props.leaderBoard.reverse();
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
