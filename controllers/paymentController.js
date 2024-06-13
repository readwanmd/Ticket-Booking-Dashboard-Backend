const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

exports.processPayment = async (req, res) => {
	const { bookingId, token } = req.body;

	try {
		const booking = await Booking.findById(bookingId).populate('event');
		if (!booking) {
			return res.status(404).json({ msg: 'Booking not found' });
		}

		const charge = await stripe.charges.create({
			amount: booking.totalCost * 100, // Stripe amount is in cents
			currency: 'usd',
			source: token,
			description: `Payment for booking ${bookingId}`,
		});

		const payment = new Payment({
			booking: booking.id,
			amount: booking.totalCost,
			status: 'completed',
		});

		await payment.save();
		booking.status = 'paid';
		await booking.save();

		res.json({ payment });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

// controllers/paymentController.js

// Simulated payment processing logic
exports.processFakePayment = async (req, res) => {
	try {
		// Retrieve booking information from request body or params
		// For example, you might retrieve bookingId or payment details

		// Simulated payment success scenario
		// You can set a flag in the booking or payment status
		// or update the payment object in your database
		// to indicate payment success

		// For example, update a payment object associated with the booking
		// This is just a mock example, adjust as per your schema and requirements
		const bookingId = req.body.bookingId; // Assuming you pass bookingId in request body
		const paymentId = req.body.paymentId; // Example if you have a payment ID

		// Update payment status in database or booking status
		// This is just a mock example, adjust based on your actual schema
		const booking = await Booking.findByIdAndUpdate(
			bookingId,
			{ $set: { paymentStatus: 'paid' } },
			{ new: true }
		);

		// Return success response
		res.json({ msg: 'Payment successfully processed (fake)', booking });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};
