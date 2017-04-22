import React, { PureComponent } from 'react';
import { isFunction } from 'underscore';
import './board.css';

/* *
 * Class that renders the game board.
 * */
class Board extends PureComponent {

  /**
   * Creates a Board.
   */
  constructor(props) {
    super(props);
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
   * Renders board slots that will be fufilled by gamers' pieces.
   * @private 
   */
  renderSlots_() {
    let { fulfilledSlots } = this.props;
    return this.state.slots.map((slot, key) => {
      let fulfilledClass;

      if (fulfilledSlots instanceof Map && fulfilledSlots.get(key)) {
        fulfilledClass = ` fulfilled player${fulfilledSlots.get(key)}`
      }

      return (
        <div
          className={`board-slot ${fulfilledClass||''}`}
          onClick={this.slotClickHandler_.bind(this, key)}
          key={key}></div>
      );
    })
  }

  /**
   * @inheritdoc  
   */
  render() {
    return (
      <div className="board">
        {this.renderSlots_()}
      </div>
    );
  }
}

export default Board;
