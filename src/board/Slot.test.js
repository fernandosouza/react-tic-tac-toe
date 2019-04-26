import React from 'react';
import { Slot } from './Slot';
import renderer from 'react-test-renderer';

describe('Slot', () => {
  it('renders slot', () => {
    const slot = renderer.create(<Slot />).toJSON();
    expect(slot).toMatchSnapshot();
  });
});
