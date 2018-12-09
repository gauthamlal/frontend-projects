import React from 'react';
import './pomodoro-clock.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class BreakComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.length !== nextProps.length;
  }
  render() {
    return(
      <div className="class-div">
        <div id="break-label">Break Length</div>
        <div id="break-length">{this.props.length}</div>
        <button id="break-decrement" onClick={this.props.dec}><i className="fa fa-arrow-down"></i></button>
        <button id="break-increment" onClick={this.props.inc}><i className="fa fa-arrow-up"></i></button>
      </div>
    );
  }
}

class SessionComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.length !== nextProps.length;
  }
  render() {
    return(
      <div className="class-div">
        <div id="session-label">Session Length</div>
        <div id="session-length">{this.props.length}</div>
        <button id="session-decrement" onClick={this.props.dec}><i className="fa fa-arrow-down"></i></button>
        <button id="session-increment" onClick={this.props.inc}><i className="fa fa-arrow-up"></i></button>
      </div>
    );
  }
}

class TimerComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.timer !== nextProps.timer || this.props.isSession !== nextProps.isSession;
  }
  render() {
    let currentLabel = 'Session';
    if (!this.props.isSession) {
      currentLabel = 'Break';
    }
    let minsRem = Math.floor(this.props.timer/60);
    let secsRem = this.props.timer%60;
    return(
      <div className="class-div timer">
        <div id="timer-label">{currentLabel}</div>
        <div id="time-left">{ minsRem < 10 ? '0'+minsRem :minsRem }:{ secsRem < 10 ? '0'+secsRem : secsRem}</div>
        <button id="start_stop" onClick={this.props.startTimer}><i className="fa fa-play" /><i className="fa fa-pause" /></button>
        <button id="reset" onClick={this.props.resetTimer}><i className="fa fa-refresh" /></button>
        <audio id="beep" src="https://goo.gl/65cBl1"></audio>
      </div>
    );
  }
}

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      isSession: true,
      timer: 1500,
      runTimer: true
    };
    this.intervalId = null;
    this.decTimer = this.decTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
  }

  decTimer () {
    if (this.state.timer === 0) {
      let alarmAudio = document.getElementById('beep');
      alarmAudio.play();
      this.setState({
        timer: this.state.isSession ? this.state.breakLength * 60 : this.state.sessionLength * 60,
        isSession: !this.state.isSession
      })
    } else {
      this.setState({
        timer: this.state.timer - 1
      });
    }
  }

  startTimer() {
    if (this.state.runTimer) {
      this.intervalId = setInterval(this.decTimer,1000);
    } else {
      clearInterval(this.intervalId);
    }
    this.setState({
      runTimer: !this.state.runTimer
    });
  }

  setColor(timer) {
    if (timer < 60) {
      document.documentElement.style.setProperty('--primary-color', '#e60000');
      document.documentElement.style.setProperty('--secondary-color', '#ffffff');
    } else {
      document.documentElement.style.setProperty('--primary-color', '#ffffff');
      document.documentElement.style.setProperty('--secondary-color', '#e60000');
    }
  }

  resetTimer() {
    if (!this.state.runTimer) {
      clearInterval(this.intervalId);
    }
    let alarmAudio = document.getElementById('beep');
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      isSession: true,
      timer: 1500,
      runTimer: true
    });
  }

  handleBreakIncrement() {
    if (this.state.breakLength < 60) {
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    }
  }

  handleBreakDecrement() {
    if (this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  }

  handleSessionIncrement() {
    if (this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timer: this.state.timer + 60
      });
    }
  }

  handleSessionDecrement() {
    if (this.state.sessionLength > 1) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timer: this.state.timer - 60
      });
    }
  }

  render() {
    this.setColor(this.state.timer);
    return(
      <div>
        <div className="title">Pomodoro Clock</div>
        <BreakComponent inc={this.handleBreakIncrement} dec={this.handleBreakDecrement} length={this.state.breakLength}/>
        <TimerComponent startTimer={this.startTimer} resetTimer={this.resetTimer} isSession={this.state.isSession} timer={this.state.timer} />
        <SessionComponent inc={this.handleSessionIncrement} dec={this.handleSessionDecrement} length={this.state.sessionLength}/>
      </div>
    );
  }
}

export default PomodoroClock;
