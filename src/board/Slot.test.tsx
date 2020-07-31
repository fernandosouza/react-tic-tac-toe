import React from 'react';
import { Slot } from './Slot';
import { create } from 'react-test-renderer';
import 'jest-styled-components';

describe('Slot', () => {
  it('renders slot', () => {
    const slot = create(<Slot index={1} />).toJSON();
    expect(slot).toMatchSnapshot();
  });
});
