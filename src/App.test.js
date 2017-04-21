import '../testHelpers/LocalStorageMock';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from 'enzyme';

const params = {
  firstPlayer: 'Fernando',
  secondPlayer: 'Souza'
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App match={ {params} } />, div);
});

it('should be able to click on a slot', () => {
  const wrapper = mount(<App match={ {params} } />);
  wrapper.find('.grid').at(0).simulate('click');
  expect(wrapper.find('.grid').at(0).hasClass('filled')).toBe(true);
});

it('should be able to react to game end', () => {
  let spy = App.prototype.onGameEnd_ = jest.fn();
  const wrapper = mount(<App match={ {params} } />);
  wrapper.find('.grid').at(0).simulate('click');
  wrapper.find('.grid').at(3).simulate('click');
  wrapper.find('.grid').at(1).simulate('click');
  wrapper.find('.grid').at(4).simulate('click');
  wrapper.find('.grid').at(2).simulate('click');
  expect(spy.mock.calls.length).toBe(1);
  spy.mockReset();
});
