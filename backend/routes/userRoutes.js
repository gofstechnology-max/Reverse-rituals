const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser, makeUserAdmin } = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

router.post('/', registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/:id/admin').put(protect, admin, makeUserAdmin);

module.exports = router;
