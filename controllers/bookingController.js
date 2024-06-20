const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.getAllBookings = async (req, res) => {
	try {
		const bookings = await Booking.find().populate('event').populate('user');
		res.json(bookings);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

exports.userBooking = async (req, res) => {
	try {
		const userId = req.params.id;
		const bookings = await Booking.find({ user: userId });
		res.json(bookings);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

exports.getBookingById = async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.id)
			.populate('event')
			.populate('user');
		if (!booking) {
			return res.status(404).json({ msg: 'Booking not found' });
		}
		res.json(booking);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

exports.createBooking = async (req, res) => {
	const { eventId, tickets } = req.body;

	try {
		const event = await Event.findById(eventId);
		if (!event) {
			return res.status(404).json({ msg: 'Event not found' });
		}

		if (event.capacity < event.ticketsSold + Number(tickets)) {
			return res.status(400).json({ msg: 'Not enough tickets available' });
		}

		const totalCost = event.price * Number(tickets);
		// console.log(req.user);

		const newBooking = new Booking({
			event: eventId,
			user: req.user._id,
			tickets: Number(tickets),
			totalCost,
		});

		event.ticketsSold += Number(tickets);
		await event.save();

		const booking = await newBooking.save();
		res.json(booking);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

exports.updateBooking = async (req, res) => {
	const { tickets, status } = req.body;

	try {
		const booking = await Booking.findById(req.params.id);
		if (!booking) {
			return res.status(404).json({ msg: 'Booking not found' });
		}

		const event = await Event.findById(booking.event);
		if (!event) {
			return res
				.status(404)
				.json({ msg: 'Event associated with booking not found' });
		}

		const oldTickets = booking.tickets;
		const newTickets = tickets || booking.tickets;
		const ticketsDifference = newTickets - oldTickets;

		if (ticketsDifference !== 0) {
			if (
				ticketsDifference > 0 &&
				event.capacity < event.ticketsSold + ticketsDifference
			) {
				return res.status(400).json({ msg: 'Not enough tickets available' });
			}

			event.ticketsSold += ticketsDifference;
			await event.save();

			// Update totalCost based on updated tickets count
			booking.totalCost = event.price * newTickets;
		}

		booking.tickets = newTickets;
		booking.status = status || booking.status;

		await booking.save();
		res.json(booking);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

exports.deleteBooking = async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.id);
		if (!booking) {
			return res.status(404).json({ msg: 'Booking not found' });
		}

		const event = await Event.findById(booking.event);
		event.ticketsSold -= booking.tickets;
		await event.save();

		await booking.remove();
		res.json({ msg: 'Booking removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};
