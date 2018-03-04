const errors = require('restify-errors');
const config = require('../config');

var profiledb = require('../testUsers');

const options = {
	// Initialization Options
};
  
const pgp = require('pg-promise')(options);
const db = pgp(config.db.uri);

module.exports = function(server) {

    // Create a user
	server.post('/users', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(new errors.InvalidContentError("The services expects JSON to be sent. Set the Header Content-Type to 'application/json'"));
		}
		//check the json that was sent and validate it
		data = req.body || {};
		if(!data.id == null) {
			return next(new errors.InvalidContentError("The services expects JSON to be sent. Set the Header Content-Type to 'application/json'"));
		}
		data.id = profiledb.users.length + 1;
		profiledb.users.push(data);
		res.send(200, data);
		next();
	});

	// Get a list of users
	server.get('/users', (req, res, next) => {
		res.send(profiledb.users);
		next();
	});

	server.get('/usersdb', (req, res, next) => {
		db.any('select * from users')
			.then(function (data) {
			console.log(data);
			res.send(200, data);
			})
			.catch(function (err) {
			return next(err);
			});
	});

	// Get a single user by id
	server.get('/users/:userid', (req, res, next) => {
		const userid = req.params.userid;
		found = false;
		for (var i = 0, len = profiledb.users.length; i < len; i++) {
			if(profiledb.users[i].id == userid) {
				found = true;
				res.send(profiledb.users[i]);
				next();
			}
		  }
		  if(!found) {
			return next(new errors.NotFoundError('The resource you requested could not be found.'))
		  }
	});

	server.put('/users/:user_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(new errors.InvalidContentError("Expects 'application/json'"));
		}

		let update = req.body || {};

		update.id = req.params.user_id;

		console.log(update);

		const userid = req.params.user_id;
		found = false;
		for (var i = 0, len = profiledb.users.length; i < len; i++) {
			if(profiledb.users[i].id == userid) {
				console.log("Found");
				found = true;
				newRecord = Object.assign({}, profiledb.users[i], update);
				console.log(newRecord);
				res.send(200, newRecord);
				next();
			}
		  }
		  if(!found) {
			return next(new errors.NotFoundError('The resource you requested could not be found.'))
		  }

		  // 				res.send(200, data);
// 				next();

	})


	// delete a user
	server.del('/users/:userid', (req, res, next) => {
		const userid = req.params.userid;
		found = false;
		for (var i = 0, len = profiledb.users.length; i < len; i++) {
			if(profiledb.users[i].id == userid) {
				found = true;
				let newArr = profiledb.users.splice(i, 1);
				console.log(newArr);

				res.send(204);
				return next();
			}
		  }
		  if(!found) {
			return next(new errors.NotFoundError('The resource you requested could not be found.'))
		  }		
	});
 };    

