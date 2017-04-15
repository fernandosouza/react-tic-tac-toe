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
});
