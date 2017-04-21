import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Setup from './setup/Setup';
import LeaderBoard from './leaderBoard/LeaderBoard';
import './index.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Setup}/>
      <Route path="/firstPlayer/:firstPlayer/secondPlayer/:secondPlayer" component={App}/>
      <Route path="/leaderboard" component={LeaderBoard}/>
    </div>
  </Router>,
  document.getElementById('root')
);
