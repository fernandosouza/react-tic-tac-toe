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
      slots: Array(9).fill(0, 0, 9)
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
    let { filledSlots, winnerSlots } = this.props;
    return this.state.slots.map((slot, key) => {
      let filledClass;
      let winnerClass = '';

      if (winnerSlots && winnerSlots.includes(key)) {
        winnerClass = ' winner';
      }

      if (filledSlots instanceof Map && filledSlots.get(key)) {
        filledClass = ` filled player${filledSlots.get(key)}${winnerClass}`
      }

      return (
        <div
          className={`board-slot ${filledClass||''}`}
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
