import React, { PureComponent } from 'react';
import { isFunction } from 'underscore';

/* *
 * Class that renders the game board.
 * */
class Board extends PureComponent {

  /**
   * Creates a Board.
   */
  constructor(opt) {
    super(opt);
    this.state = {
      slots: Array.apply(null, {length: 9}).map(Number.call, Number)
    };
  }

  /**
   * Renders board slots that will be filled by gamers' pieces.
   * @private 
   */
  renderSlots_() {
    return this.state.slots.map((slot, key) => {
      return (
        <div
          className={'grid-' + key}
          key={key}></div>
      );
    })
  }

  /**
   * Renders the entire Board component.
   * @private 
   */
  render() {
    return (
      <div className="wrapper">
        {this.renderSlots_()}
      </div>
    );
  }
}

export default Board;
