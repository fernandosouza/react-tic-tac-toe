import TicTacToe from './TicTacToe';

describe('Game', () => {
  it('should initialize with a empty board', () => {
    let game = new TicTacToe();
    let board = game.getBoard();

    expect(board.size).toBe(0);
  });

  it('should fill a giving slot with the current player id', () => {
    let game = new TicTacToe();
    let board;

    game.fillSlot(0);
    game.fillSlot(1);
    board = game.getBoard();

    expect(board.get(0)).toBe(1);
    expect(board.get(1)).toBe(2);
  });

  it('should not fill the same slot twice', () => {
    let game = new TicTacToe();
    let board;

    game.fillSlot(0);
    game.fillSlot(0);
    board = game.getBoard();

    expect(board.get(0)).toBe(1);
    expect(board.get(0)).toBe(1);
  });

  it('should not exceed 9 game turns', () => {
    let game = new TicTacToe();
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
    let game = new TicTacToe('fernando', 'Souza', onGameFinishMock);

    game.fillSlot(0);
    game.fillSlot(3);
    game.fillSlot(1);
    game.fillSlot(4);
    game.fillSlot(2);

    expect(onGameFinishMock.mock.calls.length).toBe(1);
  });
});
