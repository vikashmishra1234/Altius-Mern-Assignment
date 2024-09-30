const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Closed'],
    default: 'Active',
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  customerName:{
    type:String,
    required:true
  },
  notes: [
    {
      text: String,
      createdBy: {
        type: String,
        ref: 'User', 
      },
      createdAt: {
        type: String,
        default: "",
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
