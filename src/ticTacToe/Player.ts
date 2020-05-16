class Player {
  public id: number;
  public name: string;
  public class: string;

  constructor(opts: {id: number, name: string, class: string}) {
    this.id = opts.id;
    this.name = opts.name || '';
    this.class = opts.class || ''
  }
}

export default Player;
