import TicTacToe from './TicTacToe';

describe('Game', () => {
  it('should initialize with a empty board', () => {
    let game = new TicTacToe();
    let board = game.getBoard();

    expect(board.length).toBe(0);
  });

  it('should fill a giving slot with the current player id', () => {
    let game = new TicTacToe();
    let board;

    game.fillSlot(0);
    game.fillSlot(1);
    board = game.getBoard();

    expect(board[0]).toBe(1);
    expect(board[1]).toBe(2);
  });
});
