import '../testHelpers/LocalStorageMock';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import TicTacToe from './ticTacToe/TicTacToe';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GameContextProvider, GameContext } from './GameContext';

Enzyme.configure({ adapter: new Adapter() });

const params = {
  firstPlayer: 'Fernando',
  secondPlayer: 'Souza'
};

let game;

beforeEach(() => {
  game = new TicTacToe();
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><GameContextProvider><App match={{ params }} /></GameContextProvider></Router>, div);
});
