"use strict";

var models 	= require('../models');

module.exports.controller = function(app){
	var viewParams = {};

	app.get('/access', function(req, res){
		res.render('account/access', viewParams);
	});

	app.post('/access/key', function(req, res){
		var key = req.body.key;
		
		if(key == 'access'){
		var time = 60; // Seconds
	        var token = app.jwt.sign({ xSecret: key }, app.get('superSecret'), { expiresIn: time });
	        console.log(new Date());

	        // return the information including token as JSON
	        if(req.cookies === undefined || req.cookies.appJwt === undefined)
	        	res.cookie("appJwt", token, {maxAge: 1000 * time * 1, httpOnly: true }); // 1 minute
	        res.json({
	        	success: true,
	          	message: 'Enjoy your token!',
	          	token: token
	        });
		} 
		else{
			res.send({
				success: false,
				message: 'Sorry, apparently your key did not work'
			});
		}
	});
}
