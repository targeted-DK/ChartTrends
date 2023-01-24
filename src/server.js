const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/apiRequest');
const cors = require('cors');

//CORS configuration
app.use(cors({
  origin: '*'
}))

// Route configurations
app.use(express.static(path.join('/Users/dk/Documents/GitHub/ChartTrends/', 'public')));
app.use('/', apiRouter); // for handling requests to the root path

app.listen(3000, () => {
  console.log('Server listening on port 3000 using parcel');
});


// module.exports = app;