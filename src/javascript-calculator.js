import React from 'react';
import './javascript-calculator.css';

const calculatorButtons = [
  {
    key: '7',
    id: 'seven'
  },
  {
    key: '8',
    id: 'eight'
  },
  {
    key: '9',
    id: 'nine'
  },
  {
    key: '/',
    id: 'divide'
  },
  {
    key: '4',
    id: 'four'
  },
  {
    key: '5',
    id: 'five'
  },
  {
    key: '6',
    id: 'six'
  },
  {
    key: '*',
    id: 'multiply'
  },
  {
    key: '1',
    id: 'one'
  },
  {
    key: '2',
    id: 'two'
  },
  {
    key: '3',
    id: 'three'
  },
  {
    key: '-',
    id: 'subtract'
  },
  {
    key: '.',
    id: 'decimal'
  },
  {
    key: '0',
    id: 'zero'
  },
  {
    key: '=',
    id: 'equals'
  },
  {
    key: '+',
    id: 'add'
  },
  {
    key: 'C',
    id: 'clear'
  }
];

class CalButton extends React.Component {
  render() {
    return(
      <button
        id={calculatorButtons[this.props.id].id}
        value={calculatorButtons[this.props.id].key}
        onClick={this.props.keyClick}>
        {calculatorButtons[this.props.id].key}
      </button>
    );
  }
}

class CalBoard extends React.Component {
  renderButton(i) {
    return(
      <CalButton keyClick={() => this.props.addKey(i)} id={i}/>
    );
  }
  shouldComponentUpdate(nextProps) {
    return false;
  }
  /*calculateBoard() {
    let finalBoard = [];
    let completeBoard = [];
    completeBoard.push(<div className="cal-row">{this.renderButton(16)}</div>);
    for (let i = 0; i < 4; i++) {
      let rowBoard = [];
      for (let  j = 0; j < 4; j++) {
        rowBoard.push(this.renderButton(4 * i + j));
      }
      completeBoard.push(<div className="cal-row">{rowBoard}</div>);
    }
    console.log(completeBoard);
    return(<div>{completeBoard}</div>);
  }*/
  render() {
    let completeBoard = [];
    completeBoard.push(<div className="cal-row">{this.renderButton(16)}</div>);
    for (let i = 0; i < 4; i++) {
      let rowBoard = [];
      for (let  j = 0; j < 4; j++) {
        rowBoard.push(this.renderButton(4 * i + j));
      }
      completeBoard.push(<div className="cal-row">{rowBoard}</div>);
    }
    return(<div>{completeBoard}</div>);
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      numberOfChars: 0
    }
  }
  handleClick(i) {
    let newDisplay = '';
    let newNumberOfChars = 0;
    // console.log('regex tester', regexForDecimal.test(calculatorButtons[i].key));
    if (calculatorButtons[i].key === 'C') {
      newDisplay = '0';
      newNumberOfChars = 0;
    } else if (calculatorButtons[i].key === '=') {
      newDisplay = eval(this.state.display).toString();
      newNumberOfChars = newDisplay.length;
    } else if (calculatorButtons[i].key === '.') {
      let displayLength = this.state.display.length;
      console.log('displayLength', displayLength);
      console.log('char at length-1', displayLength);
      newDisplay = this.state.display[displayLength-1] === calculatorButtons[i].key ? this.state.display : this.state.display.concat(calculatorButtons[i].key);
      newNumberOfChars = this.state.display[displayLength-1] === calculatorButtons[i].key ? this.state.numberOfChars : this.state.numberOfChars + 1;
    } else {
      newDisplay = this.state.numberOfChars !== 0 ? this.state.display.concat(calculatorButtons[i].key) :
    calculatorButtons[i].key !== '0' ? ''.concat(calculatorButtons[i].key) : this.state.display;
      newNumberOfChars = this.state.numberOfChars !== 0 ? this.state.numberOfChars + 1 :
    calculatorButtons[i].key !== '0' ? this.state.numberOfChars + 1 : this.state.numberOfChars;
    }
    this.setState({
      display: newDisplay,
      numberOfChars: newNumberOfChars
    });
  }
  render() {
    return(
      <div>
        <div id="display">{this.state.display}</div>
        <CalBoard addKey={i => this.handleClick(i)}/>
      </div>
    );
  }
}

export default Calculator;
