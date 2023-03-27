import express from 'express';

var router = express.Router();


router.get('/', function(req, res) {

  res.render('articleListTemplate');
});

export default router;