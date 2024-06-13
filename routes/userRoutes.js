const express = require('express');
const router = express.Router();
const {
	getAllUsers,
	getUserProfile,
	updateUserProfile,
	deleteUser,
} = require('../controllers/userController');
const { auth, admin } = require('../middlewares/auth');

router.get('/', auth, admin, getAllUsers);
router.get('/:id', auth, getUserProfile);
router.patch('/:id', auth, updateUserProfile);
router.delete('/:id', auth, admin, deleteUser);

module.exports = router;
