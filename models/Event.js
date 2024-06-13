const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	date: { type: Date, required: true },
	price: { type: Number, required: true }, // 0 for free events
	capacity: { type: Number, required: true },
	ticketsSold: { type: Number, default: 0 },
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
