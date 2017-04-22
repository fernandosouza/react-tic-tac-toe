import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Board', () => {  
  it('renders 9 slots', () => {
    const board = renderer.create(
      <Board />
    ).toJSON();
    expect(board).toMatchSnapshot();
  });

  it('renders fulfilled slots', () => {
    const fulfilledSlots = new Map();
    fulfilledSlots.set(0, 1);
    fulfilledSlots.set(1, 0);
    fulfilledSlots.set(2, 2);

    const board = renderer.create(
      <Board fulfilledSlots={fulfilledSlots} />
    ).toJSON();
    expect(board).toMatchSnapshot();
  });

  it('should call a callback function after clicking on slots', () => {
    const callbackMock = jest.fn();
    const wrapper = shallow(<Board onSlotClick={callbackMock} />);

    wrapper.find('.board-slot').at(0).simulate('click');
    expect(callbackMock.mock.calls.length).toBe(1);
  });

  it('should call a callback function with the slot index as argument after clicking on slots', () => {
    const callbackMock = jest.fn();
    const wrapper = shallow(<Board onSlotClick={callbackMock} />);

    wrapper.find('.board-slot').at(1).simulate('click');
    expect(callbackMock.mock.calls[0][0]).toBe(1);
  });
});
