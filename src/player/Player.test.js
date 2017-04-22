import Player from './Player';

describe('Player', () => {
  it('should create a Player with name and ID', () => {
    const player = new Player({
      id: 1,
      name: 'Fernando'
    });
    expect(player.id).toBe(1);
    expect(player.name).toBe('Fernando');
  });
});
