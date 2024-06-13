const express = require('express');
const router = express.Router();
const {
	processPayment,
	processFakePayment,
} = require('../controllers/paymentController');
const { auth } = require('../middlewares/auth');

router.post('/', auth, processFakePayment);

module.exports = router;
