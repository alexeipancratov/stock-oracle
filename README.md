# Stock Oracle
This is a demo of a simple Oracle for the smart contract. Oracle is represented as Node.js API + React Web UI. Web UI provides funtionality to request and set stock data in the StockQuote smart contract. Node.js API retrieves this data from a trusted 3-rd party source.

## Components

### Node.js API
Represents the back-end part of the Oracle which provides data to the smart contract.

### React Web UI
Represents the UI part of the Oracle which allows to request data from API and set it in the smart contract.
![image](https://user-images.githubusercontent.com/3188163/121762484-e24c6380-cb3e-11eb-9c8f-85809591030c.png)

Additionally it provides capability to view stock quote data on the web page.

### Smart Contract
The StockQuote smart contract is used to store and retrieve data about stocks. Setting data is assumed to happen from the Oracle side.

## Development notes

### How to run project locally

Clone the project

```bash
  git clone https://github.com/alexeipancratov/stock-oracle
```

Go to the project directory

```bash
  cd stock-oracle
```

Go to the ui directory

```bash
  cd ui
```

Install dependencies

```bash
  npm install
```

Go to the back-end directory

```bash
  cd back-end
```

Install dependencies

```bash
  npm install
```

Deploy the StockQuote smart contract to a test blockchain (e.g., Ganache) and copy-paste the contract adddress to the "ui/src/contractAbis/stockQuote.js" file

Switch to the root folder and run project

```bash
  npm start
```
