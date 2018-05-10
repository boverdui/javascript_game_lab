import React, {Component} from 'react';
import GameBoard from '../components/GameBoard.js';

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      turn: 1,
      gameWon: false,
      scoreX: 0,
      score0: 0
    }
    this.handleGameButtonClick = this.handleGameButtonClick.bind(this);
    this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
  }

  changeTurn() {
    if (this.state.turn === 1) {
      this.state.turn = 2;
    } else {
      this.state.turn = 1;
    }
  }

  checkWin() {
    const winningCombos = [
      (this.state.buttons[0] + this.state.buttons[1] + this.state.buttons[2]),
      (this.state.buttons[3] + this.state.buttons[4] + this.state.buttons[5]),
      (this.state.buttons[6] + this.state.buttons[7] + this.state.buttons[8]),
      (this.state.buttons[0] + this.state.buttons[3] + this.state.buttons[6]),
      (this.state.buttons[1] + this.state.buttons[4] + this.state.buttons[7]),
      (this.state.buttons[2] + this.state.buttons[5] + this.state.buttons[8]),
      (this.state.buttons[0] + this.state.buttons[4] + this.state.buttons[8]),
      (this.state.buttons[2] + this.state.buttons[4] + this.state.buttons[6]),
    ];
    for(const combo of winningCombos){
      if (combo === 3 || combo === 30){
        this.state.gameWon = true;
      }
    }
    this.setMessage();
  }

  setMessage() {
    let total = 0;
    for(let button of this.state.buttons) {
      total += button;
    }
    const messageBox = document.getElementById('message-box')
    if (!this.state.gameWon) {
      if (total > 44){
        messageBox.textContent = "Awww, it's a DRAW!";
      } else if (this.state.turn === 1) {
        messageBox.textContent = "It's X's turn";
      } else {
        messageBox.textContent = "It's 0's turn";
      }
    } else {
      if (this.state.turn === 1) {
        messageBox.textContent = "0 WON!";
        this.state.score0 ++;
      } else {
        messageBox.textContent = "X WON!";
        this.state.scoreX ++;
      }
    }
  }

  setClickedButtonValue(index) {
    const newButtons = this.state.buttons;
    if (this.state.turn === 1) {
      newButtons[index] = 1;
    } else {
      newButtons[index] = 10;
    }
    this.setState({buttons: newButtons});
  }

  handleGameButtonClick(value, index) {
    if (value === 0 && this.state.gameWon === false) {
      this.setClickedButtonValue(index);
      this.changeTurn();
      this.checkWin();
    }
  }

  handleResetButtonClick() {
    const newButtons = this.state.buttons;
    for(let i = 0 ; i < 9 ; i++) {
      newButtons[i] = 0;
    }
    this.setState({buttons: newButtons});
    this.state.gameWon = false;
    this.setMessage();
  }

  render() {
    return (
      <div className="game-container">
        <div className="title">
          <h1>{this.state.score0}&nbsp; n0ughts & Xrosses &nbsp;{this.state.scoreX}</h1>
        </div>
        <button
          type="button"
          onClick={this.handleResetButtonClick}>
          Start New Game
        </button>
        <p id="message-box">&nbsp;</p>
        <GameBoard
          buttons={this.state.buttons}
          turn={this.state.turn}
          handle={this.handleGameButtonClick}>
        </GameBoard>
      </div>
    );
  }
}

export default GameContainer;
