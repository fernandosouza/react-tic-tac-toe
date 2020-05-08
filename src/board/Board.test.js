import React from 'react';
import Board from './Board';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Board', () => {
  let filledSlots;
  let winnerSlots;

  beforeEach(() => {
    filledSlots = new Map();
    winnerSlots = [];
  });

  it('renders 9 slots', () => {
    const board = renderer.create(
      <Board
        filledSlots={filledSlots}
        winnerSlots={winnerSlots}
      />
    ).toJSON();
    expect(board).toMatchSnapshot();
  });

  it('renders filled slots', () => {
    filledSlots.set(0, 1);
    filledSlots.set(1, 0);
    filledSlots.set(2, 2);

    const board = renderer.create(
      <Board
        filledSlots={filledSlots}
        winnerSlots={winnerSlots}
      />
    ).toJSON();
    expect(board).toMatchSnapshot();
  });

  it('should call a callback function after clicking on slots', () => {
    const callbackMock = jest.fn();
    const wrapper = mount(<Board
      filledSlots={filledSlots}
      winnerSlots={winnerSlots}
      onSlotClick={callbackMock}
    />);
    wrapper.find('Slot').at(0).simulate('click');
    expect(callbackMock.mock.calls.length).toBe(1);
  });

  it('should call a callback function with the slot index as argument after clicking on slots', () => {
    const callbackMock = jest.fn();
    const wrapper = mount(<Board
      filledSlots={filledSlots}
      winnerSlots={winnerSlots}
      onSlotClick={callbackMock}
    />);
    wrapper.find('Slot').at(1).simulate('click');
    expect(callbackMock.mock.calls[0][0]).toBe(1);
  });
});
