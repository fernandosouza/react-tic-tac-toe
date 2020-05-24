import React from 'react';
import App from '../App';
import Setup from '../setup/Setup';
import LeaderBoard from '../leaderBoard/LeaderBoard';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

export default () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="tic-tac-toe-app">
        <Route exact path="/" render={route => {
          return <Setup {...route} />;
        }}
        />
        <Route path="/firstPlayer/:firstPlayer/secondPlayer/:secondPlayer" render={route => {
          return <App {...route} />;
        }}
        />
        <Route path="/leaderboard" render={route => {
          return <LeaderBoard {...route} />;
        }}
        />
      </div>
    </Router>
  );
}
