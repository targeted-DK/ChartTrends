import express from 'express';
var router = express.Router();


router.get('/', function(req,res){
  res.send("Specify the chart you wannt to see in the dashboard");
});

router.get('/:id', function(req, res) {
    const id = req.params.id;
    // res.sendFile("/Users/dk/Documents/GitHub/ChartTrends/src/views/chartTemplate.html");
    res.render('chartTemplate', {id:id});
    // res.send("hello");
    // console.log("here");
  });

export default router;