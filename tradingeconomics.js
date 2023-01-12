

//curl -i "https://api.tradingeconomics.com/country/mexico/?client=guest:guest"
const te = require('tradingeconomics');
    const key = 'ca58677d8901438:jds3u5vozgz1q5r';
    te.login(key);
console.log("test");
te.getEarnings(symbol = 'aapl:us', start_date = '2016-01-01', end_date = '2017-12-31')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

