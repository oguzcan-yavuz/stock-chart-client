import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const WS_URI = 'ws://localhost:8080';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { stocks: {} };
    this.initializeWebSocket();
  }

  initializeWebSocket() {
    let ws = new WebSocket(WS_URI);
    ws.onopen = () => {
      ws.send(JSON.stringify({ operator: 'add', symbol: 'aapl' }));
    };
    ws.onmessage = (event) => {
      let stocks = JSON.parse(event.data);
      if(!stocks.error)
        this.setState({ stocks: stocks });
      console.log("state:", this.state);
    }
  }

  addStock() {

  }

  deleteStock() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
