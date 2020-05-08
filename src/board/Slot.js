import React from 'react';
import styled, {css} from 'styled-components';

const SlotWrapper = styled.div`
  --dimensions: calc(var(--board-size) / 3);

  background-color: var(--base-color);
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: center;
  border: var(--grid-border);
  height: var(--dimensions);
  width: var(--dimensions);
  cursor: pointer;

  -webkit-transition: background-color 150ms linear;
        -ms-transition: background-color 150ms linear;
            transition: background-color 150ms linear;

  @keyframes win {
    0% {
      background-size: 40%;
    }

    100% {
      background-size: 50%;
    }
  }

  ${props => !props.player && css`
    :hover {
      background-color: #3e5368;
    }
  `}

  ${props => props.player === 1 && css`
    background-image: url('${process.env.PUBLIC_URL}/x.svg');
  `}

  ${props => props.player === 2 && css`
    background-image: url('${process.env.PUBLIC_URL}/circle.svg');
  `}

  ${props => props.winner && css`
    animation: win infinite alternate ease-in-out .54s;
  `}
`;

export const Slot = props => {
  return (
    <SlotWrapper
      data-testid={`Slot${props.index}`}
      player={props.player}
      winner={props.winner}
      onClick={() => props.onSlotClick(props.index)}
    />
  );
};
