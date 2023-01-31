const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const router = express.Router();
const apiRouter = require('./requests/apiRequest');
const mysqlRouter = require('./requests/mysqlRequest');
const database = require('./js/Database/serverConnection');

// CORS Configurations
app.use(cors({
  origin: '*'
}))

// Route Configurations
app.use(express.static(path.join('/Users/dk/Documents/GitHub/ChartTrends/', 'public')));
app.use('/requests', apiRouter); // for handling requests to the root path
// app.route('/').get(dataSentFromAPI);
app.use('/requests', mysqlRouter);

// Database Connection
database.connect(function(error) {
  if (error) throw error;
  console.log("Connected to RDS Database on AWS");
});

// Client Connection
app.listen(3000, () => {
  console.log('Server listening on port 3000 using parcel');
});






