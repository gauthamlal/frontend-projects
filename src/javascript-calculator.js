import React from 'react';
import './javascript-calculator.css';

const calculatorButtons = [
  {
    key: '7',
    id: 'seven',
    class: 'number-button'
  },
  {
    key: '8',
    id: 'eight',
    class: 'number-button'
  },
  {
    key: '9',
    id: 'nine',
    class: 'number-button'
  },
  {
    key: '/',
    id: 'divide',
    class: 'operator-button'
  },
  {
    key: '4',
    id: 'four',
    class: 'number-button'
  },
  {
    key: '5',
    id: 'five',
    class: 'number-button'
  },
  {
    key: '6',
    id: 'six',
    class: 'number-button'
  },
  {
    key: '*',
    id: 'multiply',
    class: 'operator-button'
  },
  {
    key: '1',
    id: 'one',
    class: 'number-button'
  },
  {
    key: '2',
    id: 'two',
    class: 'number-button'
  },
  {
    key: '3',
    id: 'three',
    class: 'number-button'
  },
  {
    key: '-',
    id: 'subtract',
    class: 'operator-button'
  },
  {
    key: '.',
    id: 'decimal',
    class: 'number-button'
  },
  {
    key: '0',
    id: 'zero',
    class: 'number-button'
  },
  {
    key: '=',
    id: 'equals',
    class: 'operator-button'
  },
  {
    key: '+',
    id: 'add',
    class: 'operator-button'
  },
  {
    key: 'C',
    id: 'clear',
    class: 'clear-button'
  }
];

class CalButton extends React.Component {
  render() {
    return(
      <button
        id={calculatorButtons[this.props.id].id}
        className={calculatorButtons[this.props.id].class}
        key={this.props.id}
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
      <CalButton key={i} keyClick={() => this.props.addKey(i)} id={i}/>
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
    completeBoard.push(<div id="clear-row" key={`key0`} className="cal-row">{this.renderButton(16)}</div>);
    for (let i = 0; i < 4; i++) {
      let rowBoard = [];
      for (let  j = 0; j < 4; j++) {
        rowBoard.push(this.renderButton(4 * i + j));
      }
      completeBoard.push(<div key={`key${i+1}`} className="cal-row">{rowBoard}</div>);
    }
    return(<div>{completeBoard}</div>);
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      numberOfChars: 0,
      lastNumberStartingIndex: 0
    }
  }
  handleClick(i) {
    console.log(calculatorButtons[i]);
    let newDisplay = this.state.display;
    let newNumberOfChars = this.state.numberOfChars;
    let newLastNumberStartingIndex = this.state.lastNumberStartingIndex;

    if (calculatorButtons[i].key === 'C') {
      newDisplay = '0';
      newNumberOfChars = 0;
      newLastNumberStartingIndex = 0;
    } else if (calculatorButtons[i].key === '=') {
      newDisplay = (Math.round(eval(this.state.display)*10000)/10000).toString();
      newNumberOfChars = newDisplay.length;
      newLastNumberStartingIndex = 0;
    } else if (calculatorButtons[i].key === '.') {
      console.log('newLastNumberStartingIndex', newLastNumberStartingIndex);
      if (!newDisplay.slice(newLastNumberStartingIndex).includes('.')) {
        newDisplay = newDisplay.concat(calculatorButtons[i].key);
        newNumberOfChars++;
      }
    } else if ('+-*/'.includes(calculatorButtons[i].key)) {
      if (this.state.numberOfChars === 0) {
        if (calculatorButtons[i].key === '-') {
          newDisplay = ''.concat(calculatorButtons[i].key);
          newNumberOfChars = this.state.numberOfChars + 1;
        }
      } else {
        let displayLength = newDisplay.length;
        if ('+-*/'.includes(newDisplay[displayLength-1])) {
          newDisplay = newDisplay.slice(0, displayLength-1).concat(calculatorButtons[i].key);
        } else {
          newDisplay = this.state.display.concat(calculatorButtons[i].key);
          newNumberOfChars = this.state.numberOfChars + 1;
        }
      }
      newLastNumberStartingIndex = newDisplay.length - 1;
    } else {
      newDisplay = this.state.numberOfChars !== 0 ? this.state.display.concat(calculatorButtons[i].key) :
    calculatorButtons[i].key !== '0' ? ''.concat(calculatorButtons[i].key) : this.state.display;
      newNumberOfChars = this.state.numberOfChars !== 0 ? this.state.numberOfChars + 1 :
    calculatorButtons[i].key !== '0' ? this.state.numberOfChars + 1 : this.state.numberOfChars;
    }
    this.setState({
      display: newDisplay,
      numberOfChars: newNumberOfChars,
      lastNumberStartingIndex: newLastNumberStartingIndex
    });
  }
  render() {
    return(
      <div id="calculator">
        <div id="display">{this.state.display}</div>
        <CalBoard addKey={i => this.handleClick(i)}/>
      </div>
    );
  }
}

export default Calculator;
