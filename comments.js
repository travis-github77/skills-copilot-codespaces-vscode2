//Create Web Server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./comment.model');
var db = 'mongodb://localhost/example';
mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Get all comments
app.get('/comments', function(req, res){
    console.log('Getting all comments');
    Comment.find({})
        .exec(function(err, comments){
            if(err){
                res.send('error has occured');
            } else {
                console.log(comments);
                res.json(comments);
            }
        });
});

//Get one comment
app.get('/comments/:id', function(req, res){
    console.log('Getting one comment');
    Comment.findOne({
        _id: req.params.id
    })
        .exec(function(err, comment){
            if(err){
                res.send('error has occured');
            } else {
                console.log(comment);
                res.json(comment);
            }
        });
});

//Create a comment
app.post('/comment', function(req, res){
    var newComment = new Comment();
    newComment.title = req.body.title;
    newComment.content = req.body.content;
    newComment.save(function(err, comment){
        if(err){
            res.send('error saving comment');
        } else {
            console.log(comment);
            res.send(comment);
        }
    });
});

//Update a comment
app.put('/comment/:id', function(req, res){
    Comment.findOneAndUpdate({
        _id: req.params.id
    },
    {$set: {title: req.body.title}},
    {upsert: true},
    function(err, newComment){
        if(err){
            console.log('error occured');
        } else {
            console.log(newComment);
            res.status(204);
        }
    });
});

//Delete a comment
app.delete('/comment/:id', function(req, res){
    Comment.findOneAndRemove({
        _id: req.params.id
    }, function(err, comment){
        if(err){
            res.send('error deleting');
        } else {
            console.log(comment);
            res.status(204);
        }
    });
});

app.listen(3000, function(){
    console.log('listening on port 3000');
});
//comment added to test git