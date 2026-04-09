const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resourceType: {
    type: String,
    enum: ['Blood', 'Food', 'Medicine', 'Shelter'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Assigned', 'Completed'],
    default: 'Pending'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
