import React from 'react';
import { shallow } from 'enzyme';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from '../App';
import Setup from '../setup/Setup';
import LeaderBoard from '../leaderBoard/LeaderBoard';
import Routes from './Routes';

const wrapper = shallow(<Routes />);
const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
  const routeProps = route.props();
  pathMap[routeProps.path] = routeProps.component;
  return pathMap;
}, {});

describe('Routes', () => {
  it('renders Setup for / route', () => {
    expect(pathMap['/']).toBe(Setup);
  });

  it('renders Leaderboard for /leaderboard route', () => {
    expect(pathMap['/leaderboard']).toBe(LeaderBoard);
  });

  it('renders App for parameterized route', () => {
    expect(pathMap['/firstPlayer/:firstPlayer/secondPlayer/:secondPlayer']).toBe(App);
  });
});
