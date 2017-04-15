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
    let { slots } = this.props;

    return this.state.slots.map((slot, key) => {
      let fulfilledClass = (Array.isArray(slots) && slots[key]) ? ` ${slots[key].fulfilledClass}` : '';

      return (
        <div
          className={`grid grid-${key}${fulfilledClass}`}
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
