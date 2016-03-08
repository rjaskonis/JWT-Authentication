"use strict";

var handlebars 	= require('express-handlebars'), hbs;

module.exports.set = function(app){
// handlebars template engine
	hbs = handlebars.create({ defaultLayout: '_default.hview' });
	app.engine('hview', hbs.engine); // hview is a custom extension (hence any extension name can be used)
	app.set('views', app.fn.path.join(__dirname, 'views'));
	app.set('view engine', 'hview');
}