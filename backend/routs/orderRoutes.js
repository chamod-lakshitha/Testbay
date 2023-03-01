const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get(
  '/getOrders',
  orderController.verifyJWT,
  orderController.getOrderDetails
);

module.exports = router;
