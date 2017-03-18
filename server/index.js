var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var app = express();

//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
// CORS Support
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // allows access to servers on all domains
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use('/hello',function(req, res, next) {
    res.send('Hello World');
    next();
});


//Connect to MongoDB

mongoose.connect('mongodb://localhost/meanapp');

mongoose.connection.once('open', function() {

    //Load the models

    app.models = require('./models/index');


    //load the routes
    var routes =  require('./routes');
    _.each(routes, function(controller, route) {
        app.use(route, controller(app, route));
    });

    console.log('Listening on port 27017...');
    app.listen(27017);
});
