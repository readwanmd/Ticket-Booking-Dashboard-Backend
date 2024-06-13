const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	// console.log(authHeader);
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'No token, authorization denied' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.user;
		// console.log(req.user);
		next();
	} catch (error) {
		res.status(401).json({ message: 'Token is not valid' });
	}
};

exports.admin = (req, res, next) => {
	// console.log(req);
	if (req.user.role !== 'admin') {
		return res.status(403).json({ message: 'Admin resource. Access denied' });
	}
	next();
};
