import '../../testHelpers/LocalStorageMock';
import React from 'react';
import LeaderBoard from './LeaderBoard';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

localStorage.setItem('gameLeaderBoard', '["Fernando", "Souza"]');

it('renders correctly', () => {
  const leaderBoard = renderer.create(
    <Router><LeaderBoard /></Router>
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
    <Router><LeaderBoard history={ { goback: ()=>{} } } match={routerParam} /></Router>
  ).toJSON();
  expect(leaderBoard).toMatchSnapshot();
});
