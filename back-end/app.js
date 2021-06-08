const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 3001;

app.use(cors());

app.get("/getStockQuote/:symbol", (req, res) => {
  axios
    .get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.symbol}&apikey=KEY`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch(() => {
      res.send('An error has occurred while retrieving stock quote');
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
