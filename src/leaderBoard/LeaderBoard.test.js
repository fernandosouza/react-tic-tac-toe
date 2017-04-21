import '../../testHelpers/LocalStorageMock';
import React from 'react';
import LeaderBoard from './LeaderBoard';
import renderer from 'react-test-renderer';

localStorage.setItem('gameLeaderBoard', '["Fernando", "Souza"]');

it('renders correctly', () => {
  const leaderBoard = renderer.create(
    <LeaderBoard />
  ).toJSON();
  expect(leaderBoard).toMatchSnapshot();
});

it('renders congratulations message', () => {
  const routerParam = {
    params: {
      winner: 'React TicTacToe'
    }
  };
  const leaderBoard = renderer.create(
    <LeaderBoard match={routerParam} />
  ).toJSON();
  expect(leaderBoard).toMatchSnapshot();
});
