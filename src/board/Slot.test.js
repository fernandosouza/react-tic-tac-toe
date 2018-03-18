import React from 'react';
import ReactDOM from 'react-dom';
import { Slot } from './Slot';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Slot', () => {
  it('renders slot', () => {
    const slot = renderer.create(<Slot />).toJSON();
    expect(slot).toMatchSnapshot();
  });
});
