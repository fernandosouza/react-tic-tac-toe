import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import App from '../App';
import Setup from '../setup/Setup';
import LeaderBoard from '../leaderBoard/LeaderBoard';
import Routes from './Routes';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<Routes />);
const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
  const routeProps = route.props();
  pathMap[routeProps.path] = routeProps.render().type;
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
