import React from 'react';
import Setup from './Setup';
import { shallow } from 'enzyme';

describe('Game', () => {
  it('should inform players` name to the parent component', () => {
    const onFinishSetupMock = jest.fn();
    const wrapper = shallow(<Setup onFinishSetup={onFinishSetupMock} />);
    const playerOneInput = wrapper.find('#playerOne');
    const playerTwoInput = wrapper.find('#playerTwo');
    
    playerOneInput.value = 'Fernando';
    playerTwoInput.value = 'Souza';
    playerOneInput.simulate('change', {target: {value: playerOneInput.value}});
    playerTwoInput.simulate('change', {target: {value: playerTwoInput.value}});

    wrapper.find('form').simulate('submit', new Event('submit'));
    expect(onFinishSetupMock.mock.calls[0][0]).toBe('Fernando');
    expect(onFinishSetupMock.mock.calls[0][1]).toBe('Souza');
  });

  it('should not call onFinishSetup if the first player`s name is missing', () => {
    const onFinishSetupMock = jest.fn();
    const wrapper = shallow(<Setup onFinishSetup={onFinishSetupMock} />);
    const playerTwoInput = wrapper.find('#playerTwo');
    
    playerTwoInput.value = 'Souza';
    playerTwoInput.simulate('change', {target: {value: playerTwoInput.value}});

    wrapper.find('form').simulate('submit', new Event('submit'));
    expect(onFinishSetupMock.mock.calls.length).toBe(0);
  });

  it('should not call onFinishSetup if the second player`s name is missing', () => {
    const onFinishSetupMock = jest.fn();
    const wrapper = shallow(<Setup onFinishSetup={onFinishSetupMock} />);
    const playerOneInput = wrapper.find('#playerTwo');
    
    playerOneInput.value = 'Souza';
    playerOneInput.simulate('change', {target: {value: playerOneInput.value}});

    wrapper.find('form').simulate('submit', new Event('submit'));
    expect(onFinishSetupMock.mock.calls.length).toBe(0);
  });
});
