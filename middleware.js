"use strict";

module.exports.set = function(app){
	require('./controllers/AccountController.js').controller(app);
	// AccountController comes first so it doesn't require tokens.


	app.use(function(req, res, next){ 
		if (req.url === '/favicon.ico') {
			res.writeHead(200, {'Content-Type': 'image/x-icon'} );
	      	res.end();
	      	return;
	  	}
 	
  		var token = req.cookies.appJwt;
	  	if(token){	 
	    	app.jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
		      	if (err) {
	    	  		res.render("layouts/_404.hview"); 
		      	} 
	      		else {
		        	// if everything is good, save to request for use in other routes
	        		req.decoded = decoded;    
	        		next();
	  			}
			});
	  	}
	  	else{
	  		//res.sendStatus(403);
			res.status(403).redirect('/access');
	  	}
	});

	app.use('/api', function(req, res, next){		
		var token = req.body.token || req.query.token || req.headers['auth-token'];
		if (token) {
			// verifies secret and checks exp
	    	app.jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
		      	if (err) {
		      		return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      	} 
		      	else {
			        // if everything is good, save to request for use in other routes
		        	req.decoded = decoded;    
		        	next();
		  		}
    		});
	  	} 
	  	else {
	    	console.log('Missing token (for API)');
	    	//res.status(403).redirect('/access');
	    	res.sendStatus(403);
	  	}
	});

	// dynamically include routes (from Controllers)
	app.fn.fs.readdirSync('./controllers').forEach(function (file) {
	  if(file.substr(-3) == '.js') {
	  	if(file != 'AccountController.js'){
	  		require('./controllers/' + file).controller(app); 
	  	}
	  }
	});


	// custom 404 page (middleware) - MUST be placed after controllers because they have already defined valid routes
	app.use(function(req,res,next){ res.status(404); res.render("layouts/_404.hview"); }); //error page
};