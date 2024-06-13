const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
	booking: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Booking',
		required: true,
	},
	amount: { type: Number, required: true },
	status: { type: String, default: 'completed' }, // 'pending', 'completed', 'failed'
	paymentDate: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
