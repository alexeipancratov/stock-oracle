import React, { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import {
  STOCK_ORACLE_ABI,
  STOCK_ORACLE_ADDRESS,
} from "../contractAbis/stockQuote";
import "./stockQuote.css";

const BLOCKCHAIN_NETWORK_URL = "http://localhost:8545";
const REST_API = "http://localhost:3001";

export default function StockQuote() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockQuote, setStockQuote] = useState(null);
  const [web3, setWeb3] = useState();
  const [contractInstance, setContractInstance] = useState();

  useEffect(() => {
    setWeb3(new Web3(BLOCKCHAIN_NETWORK_URL));
  }, []);

  useEffect(() => {
    if (web3) {
      setContractInstance(new web3.eth.Contract(
        STOCK_ORACLE_ABI,
        STOCK_ORACLE_ADDRESS
      ));
    }
  }, [web3]);

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
        console.log("Some error while retrieving data");
        console.error(error);
      }
    };
    func();
  };

  const setStockData = async (quoteData) => {
    const price = parseFloat(quoteData["05. price"]) * 1000;
    const volume = parseInt(quoteData["06. volume"]);

    const accounts = await web3.eth.getAccounts();

    contractInstance.methods
      .setStock(web3.utils.fromAscii(stockSymbol), price, volume)
      .send({ from: accounts[0] })
      .on("receipt", (receipt) => {
        alert(`Success!\nTransaction hash: ${receipt.transactionHash}`);
      });
  };

  const onViewStockQuoteClick = async () => {
    const stockPrice = await contractInstance.methods
      .getStockPrice(web3.utils.fromAscii(stockSymbol))
      .call();
    const stockVolume = await contractInstance.methods
      .getStockVolume(web3.utils.fromAscii(stockSymbol))
      .call();

    setStockQuote({
      price: stockPrice,
      volume: stockVolume,
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="md-3 row mt-5">
          <label className="col-sm-1 offset-sm-2" htmlFor="stockSymbol">
            Stock symbol
          </label>
          <div className="col-sm-5">
            <input
              id="stockSymbol"
              className="form-control"
              placeholder="Stock symbol, e.g. 'MSFT'"
              value={stockSymbol}
              onChange={onStockSymbolChange}
            />
          </div>
          <div className="col-sm-3">
            <button className="btn btn-primary" type="submit">
              Look Up
            </button>
          </div>
        </div>
      </form>
      <section id="stockQuote" className="row mt-3">
        <div className="col-sm-3 offset-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Stock quote</h5>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onViewStockQuoteClick}
              >
                View Stock Quote
              </button>
              {stockQuote && (
                <>
                  <p className="card-text mt-1">
                    <em>Price: </em>
                    {parseFloat(stockQuote.price / 1000).toFixed(4)}
                  </p>
                  <p className="card-text">
                    <em>Volume: </em>
                    {stockQuote.volume}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
