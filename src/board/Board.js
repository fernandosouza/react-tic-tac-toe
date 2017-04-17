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
   * Handles clicks on slots and passes its index through a onSlotClick 
   * function that cames from a parent component.
   * @param {String} index Slot index.
   * @private 
   */
  slotClickHandler_(index) {
    let { onSlotClick } = this.props;

    if (isFunction(onSlotClick)) {
      onSlotClick(index);
    }
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
          onClick={this.slotClickHandler_.bind(this, key)}
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
