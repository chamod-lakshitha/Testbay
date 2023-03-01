const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/dashboard', itemController.verifyJWT, itemController.loadPosts);
router.get(
  '/dashboard/:id',
  itemController.verifyJWT,
  itemController.loadRelevantPost
);
router.get('/dashboard/buy/:id', itemController.updateStock);

module.exports = router;
