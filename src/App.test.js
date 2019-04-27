import '../testHelpers/LocalStorageMock';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import TicTacToe from './ticTacToe/TicTacToe';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const params = {
  firstPlayer: 'Fernando',
  secondPlayer: 'Souza'
};

let game;

beforeEach(() => {
  game = new TicTacToe();
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><App match={ {params} } game={ game }/></Router>, div);
});

it('should be able to react to game end', () => {
  let spy = App.prototype.onGameEnd_ = jest.fn();
  const wrapper = mount(<Router><App match={ {params} } game={ game }/></Router>);
  wrapper.find('.board-slot').at(0).simulate('click');
  wrapper.find('.board-slot').at(3).simulate('click');
  wrapper.find('.board-slot').at(1).simulate('click');
  wrapper.find('.board-slot').at(4).simulate('click');
  wrapper.find('.board-slot').at(2).simulate('click');
  expect(spy.mock.calls.length).toBe(1);
  spy.mockReset();
});
