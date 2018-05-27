import React, { Component } from 'react';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = { ws: props.ws, symbols: props.symbols };
  }

  componentDidMount() {
    document.getElementById('stockSymbol')
      .addEventListener("keyup", (event) => {
        event.preventDefault();
        if(event.key === "Enter")
          document.getElementById('submitAdd').click();
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ws: nextProps.ws, symbols: nextProps.symbols });
  }

  postStock(operator, symbol=document.getElementById('stockSymbol').value) {
    this.state.ws.send(JSON.stringify({ operator: operator, symbol: symbol }));
    document.getElementById('stockSymbol').value = '';
  }

  render() {
    return (
      <div>
        <div className="deleteStock">
          <p>Click on the stocks you want to delete</p>
          { this.state.symbols.map((symbol, i) => <input type="submit" key={ i } onClick={ () => this.postStock('DELETE', symbol) } value={ symbol }/>) }
        </div>
        <div className="addStock">
          <input type="text" id="stockSymbol" placeholder="Stock symbol"/>
          <input type="submit" id="submitAdd" onClick={ () => this.postStock('ADD') } value="Add Stock"/>
        </div>
      </div>
    )
  }
}

export default Stock;
