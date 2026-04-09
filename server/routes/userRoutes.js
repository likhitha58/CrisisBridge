const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { getUsers, deleteUser, getUserProfile } = require('../controllers/userController');

router.get('/profile', auth, getUserProfile);
router.get('/', auth, authorize('Admin'), getUsers);
router.delete('/:id', auth, authorize('Admin'), deleteUser);

module.exports = router;
