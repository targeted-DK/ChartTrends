import express from 'express';
import axios from 'axios';
import {getDataFromRDS} from './requests/mysqlRequest.js'

var router = express.Router();


router.get('/', function(req,res){
  res.send("Specify the chart you wannt to see in the dashboard");
});

router.get('/:tag', function(req, res) {
    const tag = req.params.tag;

    res.render('chartTemplate', {tag: tag});

    
   
  });

export default router;