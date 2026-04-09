const Resource = require('../models/Resource');

const addResource = async (req, res) => {
  try {
    const { resourceType, quantity, location } = req.body;
    const newResource = new Resource({
      organizationId: req.user.id,
      resourceType,
      quantity,
      location
    });
    await newResource.save();
    res.json(newResource);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('organizationId', 'name email');
    res.json(resources);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(resource);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Resource removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { addResource, getResources, updateResource, deleteResource };
