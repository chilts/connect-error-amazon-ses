var express = require('express');
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');

var ses = require('../');

var config = {
    accessKeyId     : process.env.ACCESS_KEY_ID,
    secretAccessKey : process.env.SECRET_ACCESS_KEY,
    awsAccountId    : process.env.AWS_ACCOUNT_ID,
    region          : amazon.US_EAST_1,
    email           : process.env.EMAIL,
    subject         : '[example.com error] something went wrong',
};

// console.log(config);

// set the process.title for showing in 'ps'
process.title = 'app.js';

var app = module.exports = express.createServer();

// set the error middleware
app.get('/', function(req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<p>OK</p>');
});

app.get('/error', function(req, res, next) {
    next( 'This is simulating an error.' );
});

// set the error handler - which passes it through on to express.errorHandler() for default rendering action
app.use( ses(config) );
app.use(express.errorHandler());

app.listen(3000);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
