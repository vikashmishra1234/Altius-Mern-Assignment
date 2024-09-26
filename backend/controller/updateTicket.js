const Ticket = require('../models/Ticket');

exports.updateTicketStatus = async (req, res) => {
  const { ticketId, status } = req.body;  
console.log(ticketId)
  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    ticket.status = status;

    await ticket.save();

    res.status(200).json({ message: 'Ticket status updated successfully', ticket });
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
