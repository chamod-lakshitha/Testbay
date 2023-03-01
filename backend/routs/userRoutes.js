const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', userController.loginUser);
router.post('/sign_in', userController.signInUser);
router.get('/sign_out', userController.verifyJWT, userController.signOutUser);

module.exports = router;
