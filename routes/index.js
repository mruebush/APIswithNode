const errors = require('restify-errors');
const _ = require('lodash');

var profiledb = require('../testUsers');

module.exports = function(server) {

    // Create a user
	// server.post('/todos', (req, res, next) => {
	// 	if (!req.is('application/json')) {
	// 		return next(
	// 			new errors.InvalidContentError("The services expects JSON to be sent. Set the Header Content-Type to 'application/json'"),
	// 		);
	// 	}
	// });

	// Get a list of users
	server.get('/users', (req, res, next) => {
		res.send(profiledb.users);
		next();
	});

	// Return an individual user from the list
	// server.get('/users/:userid', (req, res, next) => {
	// 	const userid = {id: req.params.userid };
	// 	console.log(profiledb.users[0].id);
	// 	let filtered = _.filter(profiledb.users, (user, userid) => { user.id == this.id});
	// 	console.log(filtered);
	// 	if(filtered == null || filtered.length == 0) {
	// 		return next(new errors.NotFoundError('The resource you requested could not be found.'))
	// 	}
	// 	res.send(filtered);
	// 	next();
	// });

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

// 	// Update a user
// 	server.put('/todos/:todo_id', (req, res, next) => {
// 		if (!req.is('application/json')) {
// 			return next(
// 				new errors.InvalidContentError("Expects 'application/json'"),
// 			);
// 		}

// 		let data = req.body || {};

// 		if (!data._id) {
// 			data = Object.assign({}, data, { _id: req.params.todo_id });
// 		}

// 		Todo.findOne({ _id: req.params.todo_id }, function(err, doc) {
// 			if (err) {
// 				console.error(err);
// 				return next(
// 					new errors.InvalidContentError(err.errors.name.message),
// 				);
// 			} else if (!doc) {
// 				return next(
// 					new errors.ResourceNotFoundError(
// 						'The resource you requested could not be found.',
// 					),
// 				);
// 			}

// 			Todo.update({ _id: data._id }, data, function(err) {
// 				if (err) {
// 					console.error(err);
// 					return next(
// 						new errors.InvalidContentError(err.errors.name.message),
// 					);
// 				}

// 				res.send(200, data);
// 				next();
// 			});
// 		});
// 	});

// 	//delete a user
// 	server.del('/todos/:todo_id', (req, res, next) => {
// 		Todo.remove({ _id: req.params.todo_id }, function(err) {
// 			if (err) {
// 				console.error(err);
// 				return next(
// 					new errors.InvalidContentError(err.errors.name.message),
// 				);
// 			}

// 			res.send(204);
// 			next();
// 		});
// 	});
 };    