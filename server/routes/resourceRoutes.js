const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { addResource, getResources, updateResource, deleteResource } = require('../controllers/resourceController');

router.post('/', auth, authorize(['Hospital', 'NGO']), addResource);
router.get('/', auth, getResources);
router.put('/:id', auth, authorize(['Hospital', 'NGO']), updateResource);
router.delete('/:id', auth, authorize(['Hospital', 'NGO']), deleteResource);

module.exports = router;
