const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { 
  createRequest, 
  getRequests, 
  getRequestById, 
  updateRequest, 
  deleteRequest, 
  acceptRequest, 
  updateStatus 
} = require('../controllers/requestController');

router.post('/', auth, createRequest);
router.get('/', auth, getRequests);
router.get('/:id', auth, getRequestById);
router.put('/:id', auth, updateRequest);
router.delete('/:id', auth, deleteRequest);

router.put('/:id/accept', auth, authorize(['Volunteer', 'Hospital', 'NGO']), acceptRequest);
router.put('/:id/status', auth, updateStatus);

module.exports = router;
