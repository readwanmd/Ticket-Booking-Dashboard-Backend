const express = require('express');
const router = express.Router();
const { processFakePayment } = require('../controllers/paymentController');
const { auth } = require('../middlewares/auth');

router.post('/', auth, processFakePayment);

module.exports = router;
