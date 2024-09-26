const Ticket = require('../models/Ticket');

// Create Ticket Function
const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    const customerId = req.user.userId
    const name = req.user.name
    const newTicket = new Ticket({
      title,
      description,
      customerId,
      customerName:name
    });

    await newTicket.save();

    res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = { createTicket };
