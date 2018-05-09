import React, {Component} from 'react';

class GameButton extends Component {
  render() {
    return (
      <div className="button-box"
        onClick={() => this.props.handle(this.props.value, this.props.index)} >
        <img type="button"
          className="game-button"
          src={"../images/" + this.props.value + ".png"}
          alt={this.props.index}>
        </img>
      </div>
    );
  }
}

export default GameButton;
