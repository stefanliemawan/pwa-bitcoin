import React from "react";

export default class Input extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.price !== state.price) {
      return { price: props.price };
    }
    return null;
  }

  state = {
    BTC: 0,
    price: this.props.price
  };

  handleValue = event => {
    this.setState({ BTC: event.target.value });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h2>Input Count</h2>
        <input type="text" onChange={this.handleValue}></input>
        <h3>Your value = ${this.state.BTC * this.state.price}</h3>
      </div>
    );
  }
}
