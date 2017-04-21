import '../tests/LocalStorageMock';
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
