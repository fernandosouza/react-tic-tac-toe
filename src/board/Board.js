import React, { PureComponent } from 'react';
import { Slot } from './Slot';
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
    this.slots = Array(9).fill(0, 0, 9);
    this.slotClick_ = this.handleSlotClick_.bind(this);
  }

  handleSlotClick_(index) {
    this.props.onSlotClick(index);
  }

  /**
   * Renders board slots that will be fufilled by gamers' pieces.
   * @private 
   */
  renderSlots_() {
    let { filledSlots, winnerSlots } = this.props;
    return this.slots.map((slot, index) => {
      return (
        <Slot
          key={index}
          winner={winnerSlots.includes(index)}
          player={filledSlots.get(index)}
          index={index}
          onSlotClick={this.slotClick_}
        />
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
