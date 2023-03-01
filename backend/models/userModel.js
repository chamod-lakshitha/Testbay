const dbConn = require('../dbConnection');

const User = function (user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.password = user.password;
};

User.getUserDetails = (email, res) => {
  dbConn.query(
    'SELECT userId, password FROM user_table WHERE email = ?',
    [email],
    (err, dbRes) => {
      if (err) {
        res(null, err);
      } else {
        res(null, dbRes);
      }
    }
  );
};

User.registerUser = (user, res) => {
  dbConn.query(
    'SELECT * FROM user_table WHERE email = ?',
    [user.email],
    (err, dbRes) => {
      if (err) {
        res(null, err);
      } else {
        if (dbRes.length > 0) {
          res(null, 'email is already registered');
        } else {
          dbConn.query('INSERT INTO user_table SET ?', [user], (err, dbRes) => {
            if (err) {
              res(null, err);
            } else {
              res(null, dbRes);
            }
          });
        }
      }
    }
  );
};

module.exports = User;
