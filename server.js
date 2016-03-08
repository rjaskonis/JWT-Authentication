"use strict";

var express 	    = require('express');
var app     	    = express();  // define our app using express
var bodyParser    	= require('body-parser');
var cookieParser 	= require('cookie-parser')
var configuration 	= require('./configuration'); // get our config file
app.jwt           	= require('jsonwebtoken'); // used to create, sign, and verify tokens
app.fn            	= {};
app.fn.path       	= require('path');
app.fn.fs         	= require('fs');

app.set('port', 3000);
app.set('superSecret', configuration.secret); // secret variable

app.use(express.static(app.fn.path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//app.use(express.favicon());

require('./viewEngine').set(app);
require('./middleware').set(app);


app.listen(app.get('port'));
console.log("Server listening on localhost:" + app.get('port'));

	