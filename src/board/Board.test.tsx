import React from 'react';
import Board from './Board';
import renderer from 'react-test-renderer';
import { Slot } from './Slot';

describe('Board', () => {
  it('renders 9 slots', () => {
    const board = renderer.create(
      <Board />
    );
    expect(board.root.findAllByType(Slot).length).toBe(9);
  });
});
