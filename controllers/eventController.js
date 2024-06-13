const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
	try {
		const events = await Event.find();
		res.json(events);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

exports.getEventById = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) {
			return res.status(404).json({ msg: 'Event not found' });
		}
		res.json(event);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

exports.createEvent = async (req, res) => {
	const { name, description, date, price, capacity } = req.body;

	try {
		const newEvent = new Event({ name, description, date, price, capacity });
		const event = await newEvent.save();
		res.json(event);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

exports.updateEvent = async (req, res) => {
	const { name, description, date, price, capacity } = req.body;

	try {
		const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!event) {
			return res.status(404).json({ msg: 'Event not found' });
		}

		res.status(200).json(event);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

exports.deleteEvent = async (req, res) => {
	try {
		await Event.findByIdAndDelete(req.params.id);
		res.json({ msg: 'Event removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};
