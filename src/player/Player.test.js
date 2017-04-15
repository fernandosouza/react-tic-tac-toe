import Player from './Player';

describe('Player', () => {
  it('should create a Player with name', () => {
    const player = new Player({
      name: 'Fernando'
    });
    expect(player.name).toBe('Fernando');
  });

  it('should create a Player with a CSS class reference', () => {
    const player = new Player({
      class: 'player1'
    });
    expect(player.class).toBe('player1');
  });
});
