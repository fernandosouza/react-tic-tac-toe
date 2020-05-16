import React, { useContext, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { ReactComponent as X } from './x.svg';
import { ReactComponent as Circle } from './circle.svg';
import { GameContext } from '../GameContext';

const scale = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
`;

const Player1 = styled(X)`
  width: 100px;
  height: 100px;

  ${props => props.winner && css`
    animation: ${scale} infinite alternate ease-in-out .54s;
  `}
`

const Player2 = styled(Circle)`
  width: 100px;
  height: 100px;

  ${props => props.winner && css`
    animation: ${scale} infinite alternate ease-in-out .54s;
  `}
`

const SlotWrapper = styled.div`
  --dimensions: calc(var(--board-size) / 3);

  /*TODO: How to move this block to a shared place? */
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--base-color);
  border: var(--grid-border);
  height: var(--dimensions);
  width: var(--dimensions);
  transition: background-color 150ms linear;
  cursor: pointer;

  ${props => !props.player && css`
    :hover {
      background-color: #3e5368;
    }
  `}
`;

export const Slot = props => {
  const [player, setPlayer] = useState(null);
  const gameContext = useContext(GameContext);
  const onSlotClick = (index) => {
    gameContext.game.fillSlot(index);
    if (gameContext.game.getBoard().get(index)) {
      setPlayer(gameContext.game.getBoard().get(index));
    }
  }

  return (
    <SlotWrapper
      data-testid={`Slot${props.index}`}
      onClick={() => onSlotClick(props.index)}
    >
      {
        {
          1: <Player1 winner={props.winner || undefined} />,
          2: <Player2 winner={props.winner || undefined} />
        }[player]
      }
    </SlotWrapper>
  );
};
