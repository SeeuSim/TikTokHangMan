import React from 'react';
import './Game.css';
import { WordGen, Completed} from "./Words.js";

import post from "./images/0.jpg";
import head from "./images/1.jpg";
import body from "./images/2.jpg";
import rightarm from "./images/3.jpg";
import leftarm from "./images/4.jpg";
import rightleg from "./images/5.jpg";
import leftleg from "./images/6.jpg";

class Game extends React.Component {
  static defaultProps = {
    MaxMistakes: 6,
    images: [post, head, body, rightarm, leftarm, rightleg, leftleg]
  }

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: WordGen.getWord()
    }
  }

  attempt = click => {
    let char = click.target.value;
    this.setState(status => ({
      guessed: status.guessed.add(char),
      mistake: status.mistake + (status.answer.includes(char)? 0: 1)
    }));
  }

  next_match = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: WordGen.getWord()
    });
  }

  game_word() {
    return this.state.answer.split("").map(char => (
      this.state.guessed.has(char) ? " " + char.toUpperCase() + " " : " _ "
      ));
  }

  keys() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(char => (
      this.state.guessed.has(char) ?
        (this.state.answer.includes(char) ?
            (<button class='Keys-correct' key = {char} value = {char}
                    disabled = {true}>
                {char.toUpperCase()}
            </button>)
          :
            (<button class='Keys-wrong' key={char} value={char}
                     disabled = {true}>
                {char.toUpperCase()}
            </button>))
        : 
        (<button class='Key' key={char} value={char} onClick={this.attempt}>
            {char.toUpperCase()}
         </button>)));
  }


  render() {
    const lose = this.state.mistake >= this.props.MaxMistakes;
    const win = this.game_word().join("").replace(/\s/g,'') === this.state.answer.toUpperCase();
    let status = this.keys();

    if (win) {
      WordGen.win(this.state.answer)
      status = "Too Easy, another round?";
    } else if (lose) {
      status = "Aww, you lost :(";
    }

    return (
      <div className="Game-container">
        <div className='Game-title'>
          <h1>Hangman</h1>
        </div>
        <div className='Mistakes-made'> 
        Chances Used: <strong>{this.state.mistake}</strong> out of <strong>{this.props.MaxMistakes}</strong>           
        </div>
        <div className='Images'> 
          <img src={this.props.images[this.state.mistake]} alt=""></img>
        </div>
        <div className='Instruction'>
          <p>Guess the word below !</p>
        </div>
        <div className='game-word'>
          <p>
            {!lose ? this.game_word() : this.state.answer.split("").map(letter => " " + letter.toUpperCase() + " ")}
          </p>
        </div>
        <div className="Footer">
          <p>
            {status}
          </p>
          <button className='btn btn-info' onClick={this.next_match}
          variant="outline-primary">Next Match</button>
          {Completed()}
        </div> 
      </div>
    );
  }
}

export default Game;