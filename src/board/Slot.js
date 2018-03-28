import React from 'react';

export const Slot = props => {
  let filledClass = '';

  if (props.player) {
    filledClass += `filled player${props.player}`;
  }

  if (props.winner) {
    filledClass += ' winner';
  }

  return (
    <div
      className={`board-slot ${filledClass}`}
      onClick={props.onSlotClick}
    />
  );
};
