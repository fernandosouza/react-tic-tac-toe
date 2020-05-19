class Player {
  public id: number;
  public name: string;

  constructor(opts: {id: number, name: string}) {
    this.id = opts.id;
    this.name = opts.name || '';
  }
}

export default Player;
