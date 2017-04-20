import React from 'react';
import Setup from './Setup';
import { shallow } from 'enzyme';

describe('Game', () => {
  it('should inform players` name to the parent component', () => {
    const myMock = jest.fn();
    const wrapper = shallow(<Setup onFinishSetup={myMock} />);
    const playerOneInput = wrapper.find('#playerOne');
    const playerTwoInput = wrapper.find('#playerTwo');
    
    playerOneInput.value = 'Fernando';
    playerTwoInput.value = 'Souza';
    playerOneInput.simulate('change', {target: {value: playerOneInput.value}});
    playerTwoInput.simulate('change', {target: {value: playerTwoInput.value}});

    wrapper.find('form').simulate('submit', new Event('submit'));
    expect(myMock.mock.calls[0][0]).toBe('Fernando');
    expect(myMock.mock.calls[0][1]).toBe('Souza');
  });

  it('should not call onFinishSetup if the first player`s name is missing', () => {
    const myMock = jest.fn();
    const wrapper = shallow(<Setup onFinishSetup={myMock} />);
    const playerTwoInput = wrapper.find('#playerTwo');
    
    playerTwoInput.value = 'Souza';
    playerTwoInput.simulate('change', {target: {value: playerTwoInput.value}});

    wrapper.find('form').simulate('submit', new Event('submit'));
    expect(myMock.mock.calls.length).toBe(0);
  });

  it('should not call onFinishSetup if the second player`s name is missing', () => {
    const myMock = jest.fn();
    const wrapper = shallow(<Setup onFinishSetup={myMock} />);
    const playerOneInput = wrapper.find('#playerTwo');
    
    playerOneInput.value = 'Souza';
    playerOneInput.simulate('change', {target: {value: playerOneInput.value}});

    wrapper.find('form').simulate('submit', new Event('submit'));
    expect(myMock.mock.calls.length).toBe(0);
  });
});
