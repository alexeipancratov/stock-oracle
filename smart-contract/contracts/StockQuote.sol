// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract StockQuote {
    struct Stock {
        uint price;
        uint volume;
    }
    
    mapping(bytes4 => Stock) stockQuotes;
    address oracleOwner;

    constructor() {
        oracleOwner = msg.sender;
    }

    function setStock(bytes4 symbol, uint price, uint volume) public {
        require(msg.sender == oracleOwner, "Only Oracle owner can set stock quote");
        
        Stock memory stock = Stock(price, volume);
        stockQuotes[symbol] = stock;
    }

    function getStockPrice(bytes4 symbol) public view returns (uint) {
        return stockQuotes[symbol].price;
    }

    function getStockVolume(bytes4 symbol) public view returns (uint) {
        return stockQuotes[symbol].volume; 
    }
}