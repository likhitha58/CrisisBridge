const Resource = require('../models/Resource');

const addResource = async (req, res) => {
  try {
    const { resourceType, quantity, location } = req.body;
    
    // Validation
    if (!resourceType || !quantity || !location) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }
    
    if (!['Blood', 'Food', 'Medicine', 'Shelter'].includes(resourceType)) {
      return res.status(400).json({ msg: 'Invalid resource type' });
    }
    
    if (quantity <= 0) {
      return res.status(400).json({ msg: 'Quantity must be greater than 0' });
    }
    
    const newResource = new Resource({
      organizationId: req.user.id,
      resourceType,
      quantity,
      location
    });
    await newResource.save();
    res.json(newResource);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('organizationId', 'name email');
    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ msg: 'Resource not found' });
    
    // Check ownership - only the organization that created it can update
    if (resource.organizationId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to update this resource' });
    }
    
    const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedResource);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ msg: 'Resource not found' });
    
    // Check ownership - only the organization that created it can delete
    if (resource.organizationId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this resource' });
    }
    
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Resource removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = { addResource, getResources, updateResource, deleteResource };
