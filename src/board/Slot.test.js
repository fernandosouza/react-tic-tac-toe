import React from 'react';
import { Slot } from './Slot';
import { create } from 'react-test-renderer';

describe('Slot', () => {
  it('renders slot', () => {
    const slot = create(<Slot />).toJSON();
    expect(slot).toMatchSnapshot();
  });
});
