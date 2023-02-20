import express from 'express';
var router = express.Router();

//list of personal letter
router.get('/', function(req,res){
    res.send('list of letters');
});

//a personal letter in full text and
router.get('/:id', function(req, res){
    res.send("Feb.24 - thoughts on CAPEX");
})

export default router;