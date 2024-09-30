const { query } = require("express");
const Ticket = require("../models/Ticket");
const moment = require('moment-timezone');
exports.getCustomerTickets = async(req,res)=>{
    try {
        const customerId = req.user.userId;
        if(!customerId){
            return res.status(404).json({
                success:false,
                error:'credentials not found'
            })
        }
        const usertickets = await Ticket.find({customerId}).sort({ createdAt: -1 });
        const tickets = usertickets.map(user => {
            return {
              ...user._doc, 
              createdAt: moment(user.createdAt).tz("Asia/Kolkata").format(), 
              updatedAt: moment(user.updatedAt).tz("Asia/Kolkata").format()  
            };
          });
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
        const alltickets = await Ticket.find({}).sort({ createdAt: -1 });
        if(alltickets.length==0){
            return res.status(404).json({
                success:false,
                error:"tickects not found"
            })
        }
        const tickets = alltickets.map(user => {
            return {
              ...user._doc, 
              createdAt: moment(user.createdAt).tz("Asia/Kolkata").format(), 
              updatedAt: moment(user.updatedAt).tz("Asia/Kolkata").format()  
            };
          });
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