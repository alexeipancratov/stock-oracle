import React, { useState } from "react";
import Web3 from "web3";
import axios from "axios";
import {
  STOCK_ORACLE_ABI,
  STOCK_ORACLE_ADDRESS,
} from "../contractAbis/stockQuote";

const BLOCKCHAIN_NETWORK_URL = "http://localhost:8545";
const REST_API = "http://localhost:3001";

export default function StockQuote() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockQuote, setStockQuote] = useState(null);

  const onStockSymbolChange = (e) => {
    setStockSymbol(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const func = async () => {
      try {
        const response = await axios(
          `${REST_API}/getStockQuote/${stockSymbol}`
        );
        
        await setStockData(response.data["Global Quote"]);
      } catch (error) {
        console.log('Some error while retrieving data');
        console.error(error);
      }
    };
    func();
  };

  const setStockData = async (quoteData) => {
    const price = parseFloat(quoteData["05. price"]) * 1000;
    const volume = parseInt(quoteData["06. volume"]);

    const web3 = new Web3(BLOCKCHAIN_NETWORK_URL);
    const accounts = await web3.eth.getAccounts();

    const stockQuoteInstance = new web3.eth.Contract(
      STOCK_ORACLE_ABI,
      STOCK_ORACLE_ADDRESS
    );
    stockQuoteInstance.methods
      .setStock(web3.utils.fromAscii(stockSymbol), price, volume)
      .send({from: accounts[0]})
      .on("receipt", (receipt) => {
        alert(`Success!\nTransaction hash: ${receipt.transactionHash}`);
      });
  };

  const onViewStockQuoteClick = async () => {
    const web3 = new Web3(BLOCKCHAIN_NETWORK_URL);

    const stockQuoteInstance = new web3.eth.Contract(
      STOCK_ORACLE_ABI,
      STOCK_ORACLE_ADDRESS
    );
    const stockPrice = await stockQuoteInstance.methods.getStockPrice(web3.utils.fromAscii(stockSymbol)).call();
    const stockVolume = await stockQuoteInstance.methods.getStockVolume(web3.utils.fromAscii(stockSymbol)).call();

    setStockQuote({
      price: stockPrice,
      volume: stockVolume
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="stockSymbol">Stock symbol</label>
        <input
          id="stockSymbol"
          placeholder="Stock symbol, e.g. 'MSFT'"
          value={stockSymbol}
          onChange={onStockSymbolChange}
        />

        <button type="submit">Look Up</button>
      </form>
      <section>
        <button type="button" onClick={onViewStockQuoteClick}>View Stock Quote</button>
        {stockQuote && (
          <div>
            <p><em>Price: </em>{parseFloat(stockQuote.price / 1000).toFixed(4)}</p>
            <p><em>Volume: </em>{stockQuote.volume}</p>
          </div>
        )}
      </section>
    </>
  );
}
