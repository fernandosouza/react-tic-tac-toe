import React from 'react';
import App from '../App';
import Setup from '../setup/Setup';
import LeaderBoard from '../leaderBoard/LeaderBoard';
import TicTacToe from '../ticTacToe/TicTacToe';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

let game = new TicTacToe();

export default props => {
  return <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Route exact path="/" render={route => {
            return <Setup {...route} game={game} />;
          }}
        />
        <Route path="/firstPlayer/:firstPlayer/secondPlayer/:secondPlayer" render={route => {
            return <App {...route} game={game} />;
          }}
        />
        <Route path="/leaderboard" render={route => {
            return <LeaderBoard {...route} game={game} />;
          }}
        />
        <Route path="/leaderboard" render={route => {
            return <LeaderBoard {...route} game={game} />;
          }}
        />
      </div>
    </Router>;
}
