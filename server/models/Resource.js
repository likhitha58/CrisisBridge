const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resourceType: {
    type: String,
    enum: ['Blood', 'Food', 'Medicine', 'Shelter'],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  location: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
