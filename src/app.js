const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var cors = require('cors');

router.get('/',function(req,res){
  res.sendFile(path.join('/Users/dk/Documents/GitHub/ChartTrends/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.use(cors())



// app.listen(3000, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })

// router.get('/about',function(req,res){
//   res.sendFile(path.join(__dirname+'/about.html'));
// });

// router.get('/sitemap',function(req,res){
//   res.sendFile(path.join(__dirname+'/sitemap.html'));
// });

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/Users/dk/Documents/GitHub/ChartTrends/index.html', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('/index.js', function(req, res, next) {
  // Handle the get for this route
  console.log
  
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});