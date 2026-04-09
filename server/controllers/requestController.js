const Request = require('../models/Request');

const createRequest = async (req, res) => {
  try {
    const { resourceType, description, location, urgency } = req.body;
    const newRequest = new Request({
      userId: req.user.id,
      resourceType,
      description,
      location,
      urgency
    });
    await newRequest.save();
    res.json(newRequest);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getRequests = async (req, res) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.resourceType) filters.resourceType = req.query.resourceType;
    if (req.query.urgency) filters.urgency = req.query.urgency;

    const requests = await Request.find(filters).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('userId', 'name email').populate('assignedTo', 'name email');
    if (!request) return res.status(404).json({ msg: 'Request not found' });
    res.json(request);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updateRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(request);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Request removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Request not found' });
    
    request.assignedTo = req.user.id;
    request.status = 'Assigned';
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Request not found' });

    request.status = status;
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { createRequest, getRequests, getRequestById, updateRequest, deleteRequest, acceptRequest, updateStatus };
