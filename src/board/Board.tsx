import React, { PureComponent } from "react";
import styled from "styled-components";
import { Slot } from "./Slot";
import { GameContext } from "../GameContext";

const BoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid var(--grid-border-color);
  width: calc(var(--board-size) + 2px);
  box-shadow: -6px 26px 142px black;
  border-radius: 9px;
  overflow: hidden;
`;

/* *
 * Class that renders the game board.
 * */
class Board extends PureComponent {
  static contextType = GameContext;

  /**
   * Renders board slots that will be fufilled by gamers' pieces.
   * @private
   */
  private renderSlots() {
    return this.context.game.getBoard().map((_: number | null, index: number) => {
      return <Slot key={index} index={index} />;
    });
  }

  /**
   * @inheritdoc
   */
  render() {
    return <BoardWrapper>{this.renderSlots()}</BoardWrapper>;
  }
}

export default Board;
