import React from 'react';
import Setup from './Setup';
import Enzyme, { mount } from 'enzyme';
import TicTacToe from '../ticTacToe/TicTacToe';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const match = {
  params: {
    firstPlayer: 'A',
    secondPlayer: 'B'
  }
}

describe('Setup', () => {
  const game = new TicTacToe();

  it('should get the button disabled if the first player`s name is missing', () => {
    const wrapper = mount(<Setup history={[]} />);
    const playerTwoInput = wrapper.find('input[type="text"]').at(1);

    playerTwoInput.simulate('change', { target: { value: 'Souza' } });

    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  });

  it('should get the button disabled if the second player`s name is missing', () => {
    const wrapper = mount(<Setup history={[]} />);
    const playerOneInput = wrapper.find('input[type="text"]').at(0);

    playerOneInput.simulate('change', { target: { value: 'Fernando' } });

    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  });

  it('should get the buttom disabled if players` names are equal', () => {
    const wrapper = mount(<Setup history={[]} />);
    const playerOneInput = wrapper.find('input[type="text"]').at(0);
    const playerTwoInput = wrapper.find('input[type="text"]').at(1);

    playerOneInput.simulate('change', { target: { value: 'Fernando' } });
    playerTwoInput.simulate('change', { target: { value: 'Fernando' } });

    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  });

  it('should get the buttom disabled if players` names are equal', () => {
    const wrapper = mount(<Setup history={[]} />);
    const playerOneInput = wrapper.find('input[type="text"]').at(0);
    const playerTwoInput = wrapper.find('input[type="text"]').at(1);

    playerOneInput.simulate('change', { target: { value: 'Fernando' } });
    playerTwoInput.simulate('change', { target: { value: 'Fernando' } });

    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  });

  it('should get the buttom enabled if players` names are valid', () => {
    const wrapper = mount(<Setup history={[]} />);
    const playerOneInput = wrapper.find('input[type="text"]').at(0);
    const playerTwoInput = wrapper.find('input[type="text"]').at(1);

    playerOneInput.simulate('change', { target: { value: 'Fernando' } });
    playerTwoInput.simulate('change', { target: { value: 'Souza' } });

    expect(wrapper.find('button').prop('disabled')).toBeFalsy();
  });
});
