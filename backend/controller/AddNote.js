const Ticket = require('../models/Ticket');

// Function to add a reply to a ticket
const addReplyToTicket = async (req, res) => {
  try {
    const { ticketId, text } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const reply = {
      text,
      createdBy: req.user.name, 
      createdAt: new Date(),
    };

    ticket.notes.push(reply);
    ticket.updatedAt = new Date()
    await ticket.save();

    res.status(200).json({ message: 'Reply added successfully', ticket });
  } catch (error) {
    console.error('Error adding reply to ticket:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = { addReplyToTicket }; // Ensure to export the new function
