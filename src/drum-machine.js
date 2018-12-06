import React from 'react';
import './drum-machine.css';

let padKeys = [
  {
    keyAlphabet: 'Q',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    keyCode: 81
  },
  {
    keyAlphabet: 'W',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
    keyCode: 87
  },
  {
    keyAlphabet: 'E',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    keyCode: 69
  },
  {
    keyAlphabet: 'A',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
    keyCode: 65
  },
  {
    keyAlphabet: 'S',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    keyCode: 83
  },
  {
    keyAlphabet: 'D',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    keyCode: 68
  },
  {
    keyAlphabet: 'Z',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    keyCode: 90
  },
  {
    keyAlphabet: 'X',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    keyCode: 88
  },
  {
    keyAlphabet: 'C',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    keyCode: 67
  }
];

class DrumPad extends React.Component {
  render() {
    console.log(this.props.index, "insideDrumPad");
    return (
      <div id={this.props.index} className="drum-pad" onClick={this.props.play}>
        <audio src={padKeys[this.props.index].src} id={padKeys[this.props.index].keyAlphabet} className="clip"></audio>
        {padKeys[this.props.index].keyAlphabet}
      </div>
    );
  }
}

class DrumBoard extends React.Component {

  shouldComponentUpdate(nextProps) {
    return false;
  }

  renderPad(i) {
    console.log(i, 'inside drumboard');
    return (
      <DrumPad key={i} play={() => this.props.playAudio(i)} index={i} />
    );
  }

  render() {
    let boardArr = [];
    for (let i = 0; i < 3; i++) {
      let rowArr = [];
      for (let j = 0; j < 3; j++) {
        rowArr.push(this.renderPad(3 * i + j));
        console.log(3 * i + j);
      }
      console.log(rowArr);
      boardArr.push(<div key={i} className="drum-row">{rowArr}</div>);
    }

    return(
      <div className="drum-board">
      {boardArr}
      </div>
    );
  }
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Let's Rock n' Roll!"
    }
  }

  componentDidMount() {
    document.addEventListener('keydown',this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    console.log(event.keyCode);
    for (let i = 0; i < padKeys.length; i++) {
      if (event.keyCode === padKeys[i].keyCode) {
        this.handleClick(i);
        break;
      }
    }
  };

  handleClick(i) {
    console.log(i, "i");
    console.log('Inside handleClick');
    this.setState({
      display: padKeys[i].keyAlphabet
    });
    let audioToPlay = document.getElementById(padKeys[i].keyAlphabet);
    audioToPlay.play();
  }

  render() {
    return(
      <div id="drum-machine">
        <div id="display">{this.state.display}</div>
        <DrumBoard playAudio={i => this.handleClick(i)}/>
      </div>
    );
  }
}

export default DrumMachine;
