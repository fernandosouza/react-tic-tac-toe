import '../testHelpers/LocalStorageMock';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import { MemoryRouter as Router } from 'react-router-dom';
import TicTacToe from './ticTacToe/TicTacToe';

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
  ReactDOM.render(<Router><App match={{ params }} /></Router>, div);
});
