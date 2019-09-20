import React from "react";
import axios from "axios";
import Pusher from "pusher-js";
import Input from "./Input";
import "./styles.css";

export default class Price extends React.Component {
  state = {
    btcprice: ""
  };

  sendPricePusher(data) {
    axios
      .post("/prices/new", {
        prices: data
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD"
      )
      .then(response => {
        this.setState({ btcprice: response.data.BTC.USD });
        localStorage.setItem("BTC", response.data.BTC.USD);
      })
      .catch(error => {
        console.log(error);
      });
    this.pusher = new Pusher("d39d3aae4dad99a024f8", {
      cluster: "ap1",
      encrypted: true,
      forceTLS: true
    });
    this.prices = this.pusher.subscribe("coin-prices");
    if (!navigator.onLine) {
      this.setState({ btcprice: localStorage.getItem("BTC") });
    }
    setInterval(() => {
      axios
        .get(
          "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD"
        )
        .then(response => {
          this.sendPricePusher(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, 10000);
    this.prices.bind(
      "prices",
      price => {
        this.setState({ btcprice: price.prices.BTC.USD });
      },
      this
    );
  }

  render() {
    return (
      <div className="container">
        <h2>Current Price</h2>
        <h1>${this.state.btcprice}</h1>
        <p>1 BTC</p>
        <Input price={this.state.btcprice} />
      </div>
    );
  }
}
