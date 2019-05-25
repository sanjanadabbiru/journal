var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient; // LOOK AT LINE NUMBER 23
 //const bcrypt  = require ('bycrypt');
/* GET home page. */
// Defines the root route. router.get receives a path and a function
// The req object represents the HTTP request and contains
// the query string, parameters, body, header
// The res object is the response Express sends when it receives
// a request
// render says to use the views/index.jade file for the layout
// and to set the value for title to 'Express'

// Define where the MongoDB server is
//var url = 'mongodb://localhost:27017';

router.get('/home', function(req, res) { //getting 
  res.render('signup', { title: 'signup' });
});  
router.get('/signup', function(req, res){
  res.render('signup', {title: 'Add user' });
});
 
router.post('/adduser', function(req, res){
  //res.render('login', {title: 'Add Student' });
  var url = 'mongodb://localhost:27017';
    // Get a Mongo client to work with the Mongo server
   // var MongoClient = mongodb.MongoClient;    // Connect to the server

   mongodb.connect(url, function(err, Client){      
      if (err) 
      {
        console.log('Unable to connect to the Server:', err);
      } 
      else
       {
        console.log('Connected to Server');
        var db=Client.db('signup');
        // Get the documents collection
        var collection = db.collection('users');
        // Get the student data passed from the form
        var user1 = {email: req.body.email, password: req.body.password};
        console.log(user1);//console log for dev purposes

        // Insert the student data into the database
        collection.insert(user1, function (err, result){
          if (err) {
            console.log(err);
          }
         
          // Close the database
          Client.close();
       });
     }
   });
  }); 
 
module.exports = router; 