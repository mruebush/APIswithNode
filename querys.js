var options = {
    // Initialization Options
    promiseLib: promise
  };
  
  var pgp = require('pg-promise')(options);
  var connectionString = 'postgres://localhost:5432/profiles';
  var db = pgp(connectionString);
  
  // add query functions
  
  module.exports = {
    getAllPuppies: getAllUsers,
    getSinglePuppy: getSingleUser,
    createPuppy: createUser,
    updatePuppy: updateUser,
    removePuppy: removeUser
  };

function getAllUsers(req, res, next) {
    db.any('select * from users')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL users'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }