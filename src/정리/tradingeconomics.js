
const te = require('tradingeconomics');
const key = 'ca58677d8901438:jds3u5vozgz1q5r';
te.login(key);



te.getFred()
  .then((data) => {
    console.log('List of US states', '\n', data, '\n')
  })
  .catch((err) => console.log(err))