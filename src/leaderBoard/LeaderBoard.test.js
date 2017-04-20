import React from 'react';
import LeaderBoard from './LeaderBoard';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const leaderBoard = renderer.create(
    <LeaderBoard leaderBoard={['Fernando', 'Souza', 'React']} />
  ).toJSON();
  expect(leaderBoard).toMatchSnapshot();
});
