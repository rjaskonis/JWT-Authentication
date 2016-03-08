"use strict";

var fs		= require('fs');
var path	= require('path');
var rootDir = path.dirname(require.main.filename);

var models = require('../models');

module.exports.controller = function(app){
	app.get('/api/person/:id?', function(req, res){
		if(req.params.id){		
			models.person.findOne({where: { id : req.params.id } }).then(function (person) {
				res.json(person);
			});	
		}
		else{
			models.person.findAll({ order: 'id'}).then(function (people) {
				res.json(people);
			});			
		}
	});

	app.post('/api/person', function(req, res){
		if(req.body.id > 0){
			models.person.findOne({ where:{ id: req.body.id } }).then(function(person){
				person.update(req.body).then(function(){					
					res.sendStatus(200);
				}).catch(function(error){
					res.sendStatus(400);
				});
			});
		}
		else{
			if(req.body.id == 0) delete req.body.id;
			models.person.build(req.body).save().then(function(){			
				res.sendStatus(200);				
			}).catch(function(error){
				res.sendStatus(400);
			});
		}
	});

	app.get('/build/person', function(req, res){		
		var cache = [];
		var objectString = JSON.stringify(models.person.attributes, function(key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
            		// Circular reference found, discard key
            		return;
        		}
        	// Store value in our collection

    			if (key=="Model") return undefined; // excludes all sequelize connection informations
        		cache.push(value);
	    	}
	    	return value;
		});
		cache = null;

		res.send("Built");

		fs.writeFile(path.join(rootDir, '/assets/models/person.json'), objectString, function(err){
			if(err) return console.log(err);
		});			
	});
}

// req.params is for url  like api/person/5
// req.query is for url params like api/person?id=5
// req.body is for posted data