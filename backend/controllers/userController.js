const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const UserModel = require('../models/userModel');
const JWT = require('jsonwebtoken');
require('dotenv').config();

exports.loginUser = (req, res) => {
  UserModel.getUserDetails(req.body.email, (err, dbRes) => {
    if (err) {
      res.json({ error: err });
    } else {
      if (dbRes.length > 0) {
        if (compareSync(req.body.password, dbRes[0].password)) {
          const token = JWT.sign(
            { userId: dbRes[0].userId },
            process.env.SECRET_KEY
          );
          res.json({
            success: 'true',
            information: 'password matched',
            token: token,
          });
        } else {
          res.json({
            success: 'false',
            information: 'password does not match',
          });
        }
      } else {
        res.json({ success: 'false' });
      }
    }
  });
};

exports.signInUser = (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    res.json({ error: 'null vales are not accepted' });
  } else {
    req.body.password = hashSync(req.body.password, genSaltSync(10));
    UserModel.registerUser(new UserModel(req.body), (err, dbRes) => {
      if (err) {
        res.json({ error: err });
      } else {
        if (dbRes.affectedRows > 0) {
          res.json({ success: true });
        } else {
          if (dbRes === 'email is already registered') {
            res.json({ res: 'email is already registered' });
          } else {
            res.json({ success: false });
          }
        }
      }
    });
  }
};

exports.signOutUser = (req, res) => {
  res.json({ success: true });
};

exports.verifyJWT = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.send({ success: false, err: 'unauthorize access' });
  } else {
    JWT.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        res.json({ success: false, err: 'unauthorize access' });
      } else {
        next();
      }
    });
  }
};
