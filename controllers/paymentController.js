const Booking = require('../models/Booking');

exports.processFakePayment = async (req, res) => {
	try {
		const bookingId = req.body.bookingId;
		// const paymentId = req.body.paymentId;

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
