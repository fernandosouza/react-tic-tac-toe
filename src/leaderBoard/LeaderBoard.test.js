import '../../testHelpers/LocalStorageMock';
import React from 'react';
import LeaderBoard from './LeaderBoard';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

localStorage.setItem('gameLeaderBoard', '["Fernando", "Souza"]');

let routeContext = {
  history: {
    goback: () => {}
  },
  match: {
    params: {
      winner: ''
    }
  }
};

it('renders correctly', () => {
  const leaderBoard = renderer.create(
    <Router>
      <LeaderBoard {...routeContext}  />
    </Router>
  ).toJSON();
  expect(leaderBoard).toMatchSnapshot();
});

it('renders congratulations message', () => {
  let localRouteContext = routeContext;
  localRouteContext.match.params.winner = 'React TicTacToe';

  const leaderBoard = renderer.create(
    <Router>
      <LeaderBoard  {...routeContext} />
    </Router>
  ).toJSON();
  expect(leaderBoard).toMatchSnapshot();
});
