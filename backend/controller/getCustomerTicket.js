const { query } = require("express");
const Ticket = require("../models/Ticket");

exports.getCustomerTickets = async(req,res)=>{
    try {
        const customerId = req.user.userId;
        if(!customerId){
            return res.status(404).json({
                success:false,
                error:'credentials not found'
            })
        }
        const tickets = await Ticket.find({customerId}).sort({ createdAt: -1 });
        if(tickets.length==0){
            return res.status(404).json({
                success:false,
                error:"tickects not found"
            })
        }
        return res.status(200).json({
            tickets,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:'internal server error'
        })
    }
}
exports.getAllTickets = async(req,res)=>{
    try {
        const tickets = await Ticket.find({}).sort({ createdAt: -1 });
        if(tickets.length==0){
            return res.status(404).json({
                success:false,
                error:"tickects not found"
            })
        }
        return res.status(200).json({
            tickets,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:'internal server error'
        })
    }
}