const Ticket = require('../models/Ticket');
const moment = require('moment-timezone');

const addReplyToTicket = async (req, res) => {
  try {
    const { ticketId, text } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    const timestamp = new Date();
    const indiaTime = moment(timestamp).tz("Asia/Kolkata").format();
    const reply = {
      text,
      createdBy: req.user.name, 
      createdAt: indiaTime,
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

const deleteReply = async (req, res) => {
  try {
    const { ticketId, noteId } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId, 
      { 
        $pull: { notes: { _id: noteId } }  
      },
      { new: true }  
    );

    if (!updatedTicket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      ticket: updatedTicket
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports = { addReplyToTicket,deleteReply }; 
