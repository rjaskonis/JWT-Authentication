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
	        var token = app.jwt.sign(key, app.get('superSecret'), { expiresInMinutes: '5' });

	        // return the information including token as JSON
	        if(req.cookies === undefined || req.cookies.appJwt === undefined)
	        	res.cookie("appJwt", token, {maxAge: 1000 * 60 * 1, httpOnly: true }); // 1 minutes
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