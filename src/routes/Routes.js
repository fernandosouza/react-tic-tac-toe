import React from 'react';
import App from '../App';
import Setup from '../setup/Setup';
import LeaderBoard from '../leaderBoard/LeaderBoard';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

export default props => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Setup}/>
        <Route path="/firstPlayer/:firstPlayer/secondPlayer/:secondPlayer" component={App}/>
        <Route path="/leaderboard" component={LeaderBoard}/>
      </div>
    </Router>
  );
}
