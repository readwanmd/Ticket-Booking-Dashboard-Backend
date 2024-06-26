const express = require('express');
const router = express.Router();
const {
	getAllBookings,
	getBookingById,
	createBooking,
	updateBooking,
	deleteBooking,
	userBooking,
} = require('../controllers/bookingController');
const { auth, admin } = require('../middlewares/auth');

router.get('/', auth, admin, getAllBookings);
router.get('/user/:id', auth, userBooking);
router.get('/:id', auth, admin, getBookingById);
router.post('/', auth, createBooking);
router.patch('/:id', auth, admin, updateBooking);
router.delete('/:id', auth, admin, deleteBooking);

module.exports = router;
