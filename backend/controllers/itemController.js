const ItemModel = require('../models/itemModel');
const JWT = require('jsonwebtoken');
require('dotenv').config();
var userId = null;

exports.loadPosts = (req, res) => {
  ItemModel.loadPostsData((err, dbRes) => {
    if (err) {
      res.json({ success: false, err: err });
    } else {
      res.json({ success: true, data: dbRes });
    }
  });
};

exports.loadRelevantPost = (req, res) => {
  ItemModel.loadPost(req.params.id, (err, dbRes) => {
    if (err) {
      res.json({ success: false, error: err });
    } else {
      if (dbRes.length > 0) {
        res.json({ success: true, data: dbRes });
      } else {
        res.json({ success: false, data: dbRes });
      }
    }
  });
};

exports.updateStock = (req, res) => {
  if (!req.query.firstName || !req.query.address) {
    res.json({ err: 'contains null values' });
  } else {
    ItemModel.updateStockCount(
      parseInt(req.params.id),
      userId,
      req.query,
      (err, dbRes) => {
        if (err) {
          res.send(err);
        } else {
          res.send(dbRes);
        }
      }
    );
  }
};

exports.verifyJWT = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.json({ success: false, err: 'unauthorize access' });
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
