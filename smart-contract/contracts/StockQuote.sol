// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract StockQuote {
    struct Stock {
        uint price;
        uint volume;
    }
    
    mapping(bytes4 => Stock) _stockQuotes;
    address _oracleOwner;

    constructor() {
        _oracleOwner = msg.sender;
    }

    function oracleOwner() public view returns(address) {
        return _oracleOwner;
    }

    function setStock(bytes4 symbol, uint price, uint volume) public {
        require(msg.sender == _oracleOwner, "Only Oracle owner can set stock quote");
        
        Stock memory stock = Stock(price, volume);
        _stockQuotes[symbol] = stock;
    }

    function getStockPrice(bytes4 symbol) public view returns (uint) {
        return _stockQuotes[symbol].price;
    }

    function getStockVolume(bytes4 symbol) public view returns (uint) {
        return _stockQuotes[symbol].volume; 
    }
}