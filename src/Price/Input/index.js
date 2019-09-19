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
      <div style={{ marginTop: 100 }}>
        <label>
          Input Count <input type="text" onChange={this.handleValue}></input>
        </label>
        <h3>Your value = ${this.state.BTC * this.state.price}</h3>
      </div>
    );
  }
}
