const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select('name email role');
		res.json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

exports.getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('name email role');
		if (!user) {
			return res.status(404).json({ msg: 'User not found' });
		}
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

exports.updateUserProfile = async (req, res) => {
	const { name, email, role } = req.body;

	try {
		let user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ msg: 'User not found' });
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.role = role || user.role;

		await user.save();
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndRemove(req.params.id);
		res.json({ msg: 'User removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};
