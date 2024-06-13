const express = require('express');
const router = express.Router();
const {
	getAllEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent,
} = require('../controllers/eventController');
const { auth, admin } = require('../middlewares/auth');

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', auth, admin, createEvent);
router.patch('/:id', auth, admin, updateEvent);
router.delete('/:id', auth, admin, deleteEvent);

module.exports = router;
