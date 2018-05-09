import React, {Component} from 'react';
import GameButton from './GameButton.js';

class GameBoard extends Component {
  render() {
    var buttons = this.props.buttons.map((button, index) => {
      return (
        <GameButton
          turn={this.props.turn}
          value={button}
          key={index}
          index={index}
          handle={this.props.handle}>
        </GameButton>
      );
    });

    return (
      <div className="game-board">
        {buttons}
      </div>
    );
  }
}

export default GameBoard;
