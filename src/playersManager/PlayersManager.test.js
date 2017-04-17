import PlayersManager from './PlayersManager';
import Player from '../player/Player';

const playerMock = {
  name: 'Fernando',
  class: 'className'
};

const playersMock = [{
  name: 'Souza',
  class: 'className2'
}, playerMock];

describe('PlayersManager', () => {
  it('should a player be a instance of Player', () => {
    const playersManager = new PlayersManager([playerMock]);
    const currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer instanceof Player).toBe(true);
  });

  it('should not throws an error if no parameter is passed to the constructor', () => {
    expect(() => {
      const playersManager = new PlayersManager();
    }).not.toThrowError();
  });

  it('should create a Player Manager instance with a player from constructor', () => {
    const playersManager = new PlayersManager([playerMock]);
    const currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer.name).toBe('Fernando');
  });

  it('should current player be the first item of the array', () => {
    const playersManager = new PlayersManager(playersMock);
    const currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer.name).toBe('Souza');
  });

  it('should add a new player from public API', () => {
    const playersManager = new PlayersManager(playersMock);
    expect(playersManager.getPlayers().length).toBe(2);
    playersManager.addPlayer(playerMock);
    expect(playersManager.getPlayers().length).toBe(3);
  });

  it('should change the current player', () => {
    const playersManager = new PlayersManager(playersMock);
    let currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer.name).toBe('Souza');
    playersManager.switchPlayer(1);
    
    currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer.name).toBe('Fernando');
  });

  it('should throws an error if switchPlayer() could not find the specified player', () => {
    const playersManager = new PlayersManager(playersMock);
    let currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer.name).toBe('Souza');

    expect(() => {
      playersManager.switchPlayer(3);
    }).toThrowError('Player not found');
  });
});
