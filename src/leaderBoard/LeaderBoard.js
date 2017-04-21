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
   * Renders winner congratulation message.
   * @private 
   */
  renderWinnerMessage_() {
    if (!this.props.match) {
      return;
    }
    
    let  { winner } = this.props.match.params;
    if (winner) {
      return <h1>Congratulations, {winner}</h1>;
    }
  }

  /**
   * @inheritdoc
   */
  render() {
    let leaderBoard = this.state.leaderBoard.reverse();
    return (
      <div>
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
