var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;  
const bcrypt = require ('bcryptjs');
router.get('/home', function(req, res) { //getting 
    res.render('login', { title: 'login' });
  });  
  router.get('/login', function(req, res){
    res.render('login', {title: 'check user' });
  });









  router.post('/checkuser', function(req, res){
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
    
          collection.findOne(user1,function(err,Client){
              if(err)
              throw err;
              if(!Client){
                  alert("no user found");
              }
              bcrypt.compare(password, Client.password, function(err, isMatch){

                if(err) throw err;
        
                if(isMatch){
        
                  return done(null, Client);
        
                } else {
        
                  return done(null, false, {message: 'Wrong password'});
        
                }
        
              });
          })



           }
     });
    }); 
   
  module.exports = router; 