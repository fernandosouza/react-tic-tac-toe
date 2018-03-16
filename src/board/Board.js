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
          winnerSlots={winnerSlots}
          filledSlots={filledSlots}
          index={index}
          onSlotClick={this.props.onSlotClick.bind(this, index)}
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
