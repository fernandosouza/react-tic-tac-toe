import React from 'react';
import Board from './Board';
import renderer from 'react-test-renderer';

describe('Board', () => {
  let filledSlots;
  let winnerSlots;

  beforeEach(() => {
    filledSlots = new Map();
    winnerSlots = [];
  });

  it('renders 9 slots', () => {
    const board = renderer.create(
      //@ts-ignore
      <Board
        winnerSlots={winnerSlots}
      />
    ).toJSON();
    expect(board).toMatchSnapshot();
  });
});
