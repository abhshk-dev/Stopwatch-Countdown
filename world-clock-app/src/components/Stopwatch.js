import React from "react";

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    };
  }
  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      console.log(`Time is ${Date.now() - this.state.timerStart}`);
      this.setState({ timerTime: Date.now() - this.state.timerStart });
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
  };

  render() {
    const { timerTime } = this.state;

    let centiSec = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let secs = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let mins = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <div className="Stopwatch">
        <button className="cross" onClick={() => this.props.close("stopwatch")}>
          ❌
        </button>
        <h2 className="stopwatch-header">Stopwatch</h2>
        <div className="stopwatch-body">
          {hours}:{mins}:{secs}:{centiSec}
        </div>
        <div>
          {this.state.timerOn === false && this.state.timerTime === 0 && (
            <button onClick={this.startTimer}>Start</button>
          )}
          {this.state.timerOn === true && (
            <button onClick={this.stopTimer}>Stop</button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button onClick={this.startTimer}>Resume</button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button onClick={this.resetTimer}>Reset</button>
          )}
        </div>
      </div>
    );
  }
}

export default Stopwatch;
