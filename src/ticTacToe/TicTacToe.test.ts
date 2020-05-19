import TicTacToe from './TicTacToe';

describe('Game', () => {
  let game: TicTacToe;

  beforeEach(() => {
    game = new TicTacToe('A', 'B');
  });

  it('should initialize with a empty board', () => {
    let board = game.getBoard();

    expect(board.size).toBe(0);
  });

  it('should fill a giving slot with the current player id', () => {
    let board;

    game.fillSlot(0);
    game.fillSlot(1);
    board = game.getBoard();

    expect(board.get(0)).toBe(1);
    expect(board.get(1)).toBe(2);
  });

  it('should not fill the same slot twice', () => {
    let board;

    game.fillSlot(0);
    game.fillSlot(0);
    board = game.getBoard();

    expect(board.get(0)).toBe(1);
    expect(board.get(0)).toBe(1);
  });

  it('should not exceed 9 game turns', () => {
    let board;

    game.fillSlot(0);
    game.fillSlot(1);
    game.fillSlot(2);
    game.fillSlot(3);
    game.fillSlot(4);
    game.fillSlot(5);
    game.fillSlot(6);
    game.fillSlot(7);
    game.fillSlot(8);
    game.fillSlot(9);
    board = game.getBoard();

    expect(board.size).toBe(9);
  });

  it('should call a registered callback as soon as the game finish', () => {
    const onGameFinishMock = jest.fn();
    game.on('gameEnd', onGameFinishMock);

    game.fillSlot(0);
    game.fillSlot(3);
    game.fillSlot(1);
    game.fillSlot(4);
    game.fillSlot(2);

    expect(onGameFinishMock.mock.calls).toHaveLength(1);
  });

  it('should pass the winner as argument to the registered callback', () => {
    const onGameFinishMock = jest.fn();
    game.on('gameEnd', onGameFinishMock);

    game.fillSlot(0);
    game.fillSlot(3);
    game.fillSlot(1);
    game.fillSlot(4);
    game.fillSlot(2);

    expect(onGameFinishMock.mock.calls[0][0].player).toHaveProperty('name', 'A');
  });

  it('should pass undefined as argument to the registered callback if no one won', () => {
    const onGameFinishMock = jest.fn();
    game.on('gameEnd', onGameFinishMock);

    game.fillSlot(0);
    game.fillSlot(2);
    game.fillSlot(1);
    game.fillSlot(3);
    game.fillSlot(5);
    game.fillSlot(7);
    game.fillSlot(6);
    game.fillSlot(8);
    game.fillSlot(4);

    expect(onGameFinishMock.mock.calls).toHaveLength(1);
    expect(onGameFinishMock.mock.calls[0][0]).toBeUndefined();
  });

  it('should clear board', () => {
    game.fillSlot(0);
    game.fillSlot(2);

    expect(game.getBoard().size).toBe(2);

    game.clearBoard();

    expect(game.getBoard().size).toBe(0);
  });
});
