import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import { shallow } from 'enzyme';

describe('Board', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Board />, div);
  });

  it('renders 9 slots', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('.grid')).toHaveLength(9);
  });

  it('renders fulfilled slots', () => {
    const slots = [1, 0, 2];
    const wrapper = shallow(<Board slots={slots} />);
    expect(wrapper.find('.grid').at(0).hasClass('filled')).toBe(true);
    expect(wrapper.find('.grid').at(1).hasClass('filled')).toBe(false);
    expect(wrapper.find('.grid').at(2).hasClass('filled')).toBe(true);
  });
});
