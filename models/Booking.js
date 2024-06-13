const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
	event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	tickets: { type: Number, required: true },
	totalCost: { type: Number, required: true },
	status: { type: String, default: 'booked' }, // 'booked' or 'cancelled'
	paymentStatus: { type: String, default: 'unpaid' }, // 'paid' or 'unpaid'
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
