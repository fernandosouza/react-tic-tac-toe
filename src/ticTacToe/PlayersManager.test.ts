import PlayersManager from './PlayersManager';
import Player from './Player';

const playerMock = new Player({
  id: 1,
  name: 'Fernando',
});

const playersMock = [new Player({
  id: 2,
  name: 'Souza'
}), playerMock];

describe('PlayersManager', () => {
  it('should a player be a instance of Player', () => {
    const playersManager = new PlayersManager([playerMock]);
    const currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer instanceof Player).toBe(true);
  });

  it('should not throws an error if no parameter is passed to the constructor', () => {
    expect(() => {
      new PlayersManager();
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
    playersManager.addPlayer('Fernando');
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

  it('should switch to the next available player', () => {
    const playersManager = new PlayersManager(playersMock);
    let currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer.name).toBe('Souza');

    playersManager.nextPlayerTurn();
    currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer.name).toBe('Fernando');
  });

  it('should select the first player of the list if the current player is the last one', () => {
    const playersManager = new PlayersManager(playersMock);
    let currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer.name).toBe('Souza');

    playersManager.nextPlayerTurn();
    currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer.name).toBe('Fernando');

    playersManager.nextPlayerTurn();
    currentPlayer = playersManager.getCurrentPlayer();
    expect(currentPlayer.name).toBe('Souza');
  });

  it('should not allow duplicated names', () => {
    const players = [
      new Player({ name: 'fernando', id: 1 }),
      new Player({ name: 'Fernando', id: 2 })
    ];
    const playersManager = new PlayersManager(players);
    playersManager.getCurrentPlayer();
    expect(playersManager.checkErros()).toHaveLength(1);
  });

  it('should duplicated error code be `duplicated_names`', () => {
    const players = [
      new Player({ name: 'fernando', id: 1 }),
      new Player({ name: 'Fernando', id: 2 })
    ];
    const playersManager = new PlayersManager(players);
    playersManager.getCurrentPlayer();
    expect(playersManager.checkErros()[0]).toEqual({
      code: 'duplicated_names'
    });
  });
});
