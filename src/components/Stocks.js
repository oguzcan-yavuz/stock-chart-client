import React, { Component } from 'react';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = { ws: props.ws };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ws: nextProps.ws });
    console.log("stocks state:", this.state);
  }

  postStock(operator) {
    let symbol = document.getElementById('stockSymbol').value;
    console.log("postStock()");
    console.log({ operator: operator, symbol: symbol });
    this.state.ws.send(JSON.stringify({ operator: operator, symbol: symbol }));
  }

  render() {
    return (
      <div>
        <div className="stocksList">

        </div>
        <div className="addStock">
          <input type="text" id="stockSymbol" placeholder="Stock symbol"/>
          <input type="submit" onClick={ () => this.postStock('ADD') } value="Add Stock"/>
        </div>
      </div>
    )
  }
}

export default Stock;
