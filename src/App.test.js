import '../testHelpers/LocalStorageMock';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let params = {
    firstPlayer: 'Fernando',
    secondPlayer: 'Souza'
  };

  ReactDOM.render(<App match={ {params} } />, div);
});
