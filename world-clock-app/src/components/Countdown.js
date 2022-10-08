import React from "react";

class Countdown extends React.Component {
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
      timerStart: this.state.timerTime,
    });

    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      console.log(`Time left is ${newTime}`);
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({
          timerOn: false,
        });
        alert("Countdown Ended");
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  adjustTimer = (input) => {
    const { timerTime, timerOn } = this.state;
    if (!timerOn) {
      if (input === "incHours" && timerTime + 3600000 < 216000000) {
        this.setState({ timerTime: timerTime + 3600000 });
      } else if (input === "decHours" && timerTime - 3600000 >= 0) {
        this.setState({ timerTime: timerTime - 3600000 });
      } else if (input === "incMinutes" && timerTime + 60000 < 216000000) {
        this.setState({ timerTime: timerTime + 60000 });
      } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
        this.setState({ timerTime: timerTime - 60000 });
      } else if (input === "incSeconds" && timerTime + 1000 < 216000000) {
        this.setState({ timerTime: timerTime + 1000 });
      } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
        this.setState({ timerTime: timerTime - 1000 });
      }
    }
  };
  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart,
      });
    }
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);
    return (
      <div className="Stopwatch">
        <button className="cross" onClick={() => this.props.close("countdown")}>
          ❌
        </button>
        <h2 className="stopwatch-header">Countdown</h2>
        <div className="Countdown-label">Hours : Minutes : Seconds</div>
        <div className="Countdown-display">
          <button onClick={() => this.adjustTimer("incHours")}>⬆</button>
          <button onClick={() => this.adjustTimer("incMinutes")}>⬆</button>
          <button onClick={() => this.adjustTimer("incSeconds")}>⬆</button>

          <div className="Countdown-time">
            {hours} : {minutes} : {seconds}
          </div>

          <button onClick={() => this.adjustTimer("decHours")}>⬇</button>
          <button onClick={() => this.adjustTimer("decMinutes")}>⬇</button>
          <button onClick={() => this.adjustTimer("decSeconds")}>⬇</button>
        </div>
        {timerOn === false &&
          (timerStart === 0 || timerTime === timerStart) && (
            <button onClick={this.startTimer}>Start</button>
          )}
        {timerOn === true && timerTime >= 1000 && (
          <button onClick={this.stopTimer}>Stop</button>
        )}
        {timerOn === false &&
          timerTime !== 0 &&
          timerStart !== timerTime &&
          timerTime !== 0 && <button onClick={this.startTimer}>Resume</button>}
        {(timerOn === false || timerTime < 1000) &&
          timerStart !== timerTime &&
          timerStart > 0 && <button onClick={this.resetTimer}>Reset</button>}
      </div>
    );
  }
}

export default Countdown;
