import React from 'react';
import Setup from './Setup';
import { shallow } from 'enzyme';
import TicTacToe from '../ticTacToe/TicTacToe';

describe('Setup', () => {
  const game = new TicTacToe();

  it('should not call onFinishSetup if the first player`s name is missing', () => {
    const onFinishSetupMock = jest.fn();
    const wrapper = shallow(<Setup history={[]} game={game} />);
    const playerTwoInput = wrapper.find('#playerTwo');
    
    playerTwoInput.value = 'Souza';
    playerTwoInput.simulate('change', {target: {value: playerTwoInput.value}});

    wrapper.find('button').simulate('click', new Event('click'));
    expect(onFinishSetupMock.mock.calls.length).toBe(0);
  });

  it('should not call onFinishSetup if the second player`s name is missing', () => {
    const onFinishSetupMock = jest.fn();
    const wrapper = shallow(<Setup history={[]} game={game} />);
    const playerOneInput = wrapper.find('#playerTwo');
    
    playerOneInput.value = 'Souza';
    playerOneInput.simulate('change', {target: {value: playerOneInput.value}});

    wrapper.find('button').simulate('click', new Event('click'));
    expect(onFinishSetupMock.mock.calls.length).toBe(0);
  });

  it('should not call onFinishSetup if players` names are equal', () => {
    const onFinishSetupMock = jest.fn();
    const wrapper = shallow(<Setup history={[]} game={game} />);
    const playerOneInput = wrapper.find('#playerOne');
    const playerTwoInput = wrapper.find('#playerTwo');
    
    playerOneInput.value = 'Fernando';
    playerTwoInput.value = 'Fernando';
    playerOneInput.simulate('change', {target: {value: playerOneInput.value}});
    playerTwoInput.simulate('change', {target: {value: playerTwoInput.value}});

    wrapper.find('button').simulate('click', new Event('click'));
    expect(onFinishSetupMock.mock.calls.length).toBe(0);
  });
});
