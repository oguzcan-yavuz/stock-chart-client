import React, { Component } from 'react';
import Chart from 'chart.js';
import Stocks from './components/Stocks.js';
import Footer from './components/Footer.js';
import { WS_URI } from './config.json';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.chart = undefined;
    this.state = { chartData: {}, ws: undefined, symbols: [] };
  }

  componentDidMount() {
    this.initializeWebSocket();
  }

  initializeWebSocket() {
    let ws = new WebSocket(WS_URI);
    ws.onmessage = (event) => {
      let stocks = JSON.parse(event.data);
      if(!stocks.error)
        this.updateChartData(stocks);
      else {
        if(stocks.error === "Empty stocks") {
          if(this.chart !== undefined)
            this.chart.destroy();
          this.setState({ symbols: [] });
        }
      }
    };
    this.setState({ ws: ws });
  }

  drawChart() {
    if(this.chart !== undefined)
      this.chart.destroy();
    let ctx = document.getElementById('stockChart').getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.state.chartData,
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Stocks'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        scales: {
          xAxes: [{
            type: 'time'
          }]
        }
      }
    });
  }

  updateChartData(stockData) {
    let dateLabels = stockData[0].data.map(stockData => stockData.date).reverse();
    let chartData = this.state.chartData;
    let symbols = [];
    chartData.labels = dateLabels;
    chartData.datasets = stockData.map(stock => {
      symbols.push(stock.symbol);
      return {
        label: stock.symbol,
        data: stock.data.map(stockData => stockData.open),
        fill: false,
        borderColor: 'lightgreen',
        backgroundColor: 'green',
      }
    });
    this.setState({ chartData: chartData, symbols: symbols });
    this.drawChart();
  }

  render() {
    return (
      <div className="App">
        <div className="chartWrapper">
          <canvas id="stockChart"/>
        </div>
        <div className="stocks">
          <Stocks ws={ this.state.ws } symbols={ this.state.symbols }/>
        </div>
        <div>
          { Footer() }
        </div>
      </div>
    )
  }
}

export default App;
