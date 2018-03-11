class Player {
  constructor(opts) {
    this.id = opts.id;
    this.name = opts.name || '';
    this.class = opts.class || ''
  }
}

export default Player;
