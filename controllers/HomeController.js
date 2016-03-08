"use strict";

var models 	= require('../models');

module.exports.controller = function(app){
	var viewParams = {};

	app.get('/home', function(req, res){
		res.render('home/index',viewParams);
	});

	app.get('/access', function(req, res){
		res.render('home/access', viewParams);
	});
}