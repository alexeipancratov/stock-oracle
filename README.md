# Stock Oracle
This is a demo of a simple Oracle for the smart contract. Oracle is represented as a back-end API which retrieves data from trusted 3-rd party source.

## Components

### Node.js API
Represents the Oracle which provides data to the smart contract.

### React Web UI
![image](https://user-images.githubusercontent.com/3188163/121762484-e24c6380-cb3e-11eb-9c8f-85809591030c.png)

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
