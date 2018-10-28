
var express  = require('express');
var app      = express();                               
var mongoose = require('mongoose');                     
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 
var cors = require('cors');
 

mongoose.connect('mongodb://AldairRomo:aldamlab98@ds121343.mlab.com:21343/request');
 
app.use(morgan('dev'));                                        
app.use(bodyParser.urlencoded({'extended':'true'}));           
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', '*');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 

var List = mongoose.model('list', {
    name: String
});
 

    app.get('/api/list', function(req, res) {
 
        console.log("fetching reviews");
 
       
        List.find(function(err, reviews) {
 
            
            if (err)
                res.send(err)
 
            res.json(reviews); 
        });
    });
   
    app.post('/api/list', function(req, res) {
 
        console.log(req.body);
 
        
        List.create({
            name : req.body.name,
        }, function(err, list) {
            if (err)
                res.send(err);
 
           
            List.find(function(err, list) {
                if (err)
                    res.send(err)
                res.json(list);
            });
        });
 
    });
 
    
    app.delete('/api/list/:review_id', function(req, res) {
        List.remove({
            _id : req.params.review_id
        }, function(err) {
            if(err){
                res.json(err);
            }
            List.find(function(error, list) {
                if (error)
                    res.send(error)
                res.json(list);
            });
        });
    });
 
 

app.listen(8080);
console.log("App listening on port 8080");
