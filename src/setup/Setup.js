import React, { Component } from 'react';
import { GameContext } from '../GameContext';
import styled from 'styled-components';
import { ReactComponent as X } from '../x.svg';
import { ReactComponent as Circle } from '../circle.svg';

const SetupPage = styled.div`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  width: 200px;
  margin: 10px auto;
  display: block;
  font-size: 16px;
  outline: 0;
  &::placeholder {
    color: #fff;
  }

  background: var(--base-color);
  border: 1px solid var(--base-color-lighter);
  border-radius: 5px;
  color: #fff;
  font-weight: 200;
  padding: 10px;

  &:focus {
    background: var(--base-color-lighter);
  }
`;

const Player = styled.div`
  margin: 20px 0;
  display: flex;

  svg {
    margin: 0 auto;
    width: 140px;
    height: 140px;
  }
`;

const Collumn = styled.div`
  flex-grow: 1;
  width: 50%;
`


/**
 * Component responsible for getting players` name and passes it to the parent 
 * component through a function named `onFinishSetup`.
 **/
class Setup extends Component {
  static contextType = GameContext;

  constructor(props) {
    super(props);

    this.onPlayerTwoNameChange_ = this.onPlayerTwoNameChange_.bind(this);
    this.onPlayerOneNameChange_ = this.onPlayerOneNameChange_.bind(this);
    this.onFormSubmit_ = this.onFormSubmit_.bind(this);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
    }
  }

  componentDidMount() {
    this.context.game.clearBoard();
  }

  /**
   * Express conditions to disable form submission.
   * @returns {boolean} true for disable and false for enable
   * @private 
   **/
  disableForm_() {
    let { playerOneName, playerTwoName } = this.state;
    return !playerOneName || !playerTwoName || playerOneName === playerTwoName;
  }

  /**
   * Listens to the form submission and informs players` name to the
   * parent component.
   * @param {event} event The event object
   * @private 
   **/
  onFormSubmit_(event) {
    event.preventDefault();
    let { playerOneName, playerTwoName } = this.state;
    if (!this.context.game.playersManager_.checkErros().lenght) {
      this.props.history.push(`/firstPlayer/${playerOneName}/secondPlayer/${playerTwoName}`);
    }
  }

  /**
   * Stores the first player's name in the state object.
   * @param {event} event The event object
   * @private 
   **/
  onPlayerOneNameChange_(event) {
    this.setState({
      playerOneName: event.target.value
    });
  }

  /**
   * Stores the second player's name in the state object.
   * @param {event} event The event object
   * @private 
   **/
  onPlayerTwoNameChange_(event) {
    this.setState({
      playerTwoName: event.target.value
    });
  }

  /**
   * @inheritdoc
   **/
  render() {
    let disabled = this.disableForm_();

    return (
      <>
        <SetupPage>
          <Collumn>
            <Player>
              <X />
            </Player>
            <Input
              type="text"
              value={this.state.playerOneName}
              placeholder="Player one"
              onChange={this.onPlayerOneNameChange_}
              id="playerOne" />
          </Collumn>

          <Collumn>
            <Player>
              <Circle />
            </Player>
            <Input
              type="text"
              value={this.state.playerTwoName}
              placeholder="Player two"
              onChange={this.onPlayerTwoNameChange_}
              id="playerTwo" />
          </Collumn>
        </SetupPage>
        <button className="button" disabled={disabled} onClick={this.onFormSubmit_}> Let's rock! </button>
      </>
    );
  }
}

export default Setup;
