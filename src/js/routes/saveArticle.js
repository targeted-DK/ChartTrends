import express from 'express';
import fs from 'fs';
var router = express.Router();

router.post('/', function(req, res) {
   console.log("save article.js");
//    console.log(req.body);
   var data = req.body;

     // Save the data to a file
    var url = 'public/static/articles/' + data.title;
    console.log(url);
    //  console.log(url);
    

  fs.writeFile(url, JSON.stringify(data), function(err) {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving file');
    } else {
      console.log('File saved successfully');
      res.status(200).send({message : "Data received on saveArticle.js"})
    }
  });
 
  });


export default router;
   // Save the text to the database using your preferred method
  // Here's an example using MongoDB and Mongoose:
  // var newDoc = new MyModel({ text: text });
  // newDoc.save(function(err) {
  //   if (err) {
  //     res.status(500).send('Error saving text');
  //   } else {
  //     res.status(200).send('Text saved successfully');
  //   }
  // });