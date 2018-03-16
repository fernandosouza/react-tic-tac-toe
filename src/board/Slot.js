import React from 'react';

export const Slot = props => {
  let filledClass = '';
  let winnerClass = '';

  if (props.winnerSlots.includes(props.index)) {
    winnerClass = ' winner';
  }

  if (props.filledSlots.get(props.index)) {
    filledClass = ` filled player${props.filledSlots.get(
      props.index
    )}${winnerClass}`;
  }
  return (
    <div
      className={`board-slot ${filledClass}`}
      onClick={props.onSlotClick}
    />
  );
};
