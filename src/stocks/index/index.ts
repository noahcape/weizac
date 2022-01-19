import axios from "axios";

// https://www.alphavantage.co/documentation/

const FUNCTIONS = {
  INTRADAY: "TIME_SERIES_INTRADAY_EXTENDED",
};

const url = "https://www.alphavantage.co/query?";
const apiKey = "";

// request real time share value of ticker
const currentPrice = (ticker: string): any => {
  return axios
    .get(
      `${url}function=${FUNCTIONS.INTRADAY}&symbol=${ticker}&interval=15min&slice=year1month1&apikey=${apiKey}`
    )
    .then((response) => response);
};

// make a buy
const buy = (ticker: string, quantity: number): boolean => {
  // validate ticker
  // if ticker is not validated return false

  // if ticker is validated make ask and add position to users portfolio
  return true;
};
