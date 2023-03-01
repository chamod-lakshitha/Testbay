const JWT = require('jsonwebtoken');
const OrderModel = require('../models/orderModel');
require('dotenv').config();
var userId = null;

exports.getOrderDetails = (req, res) => {
  OrderModel.loadOrderDetails(userId, (err, dbRes) => {
    if (err) {
      res.json({ success: false, error: err });
    } else {
      if (dbRes.length > 0) {
        res.json({ success: true, data: dbRes });
      } else {
        res.json({ success: true, data: dbRes });
      }
    }
  });
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
        userId = payload.userId;
        next();
      }
    });
  }
};
