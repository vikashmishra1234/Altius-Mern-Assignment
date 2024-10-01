const express = require('express');
const { RegisterUser, loginUser, getUser } = require('../controller/RegisterUser');
const { authenticate } = require('../verifyAuth');
const { createTicket } = require('../controller/createTicket');
const { getCustomerTickets, getAllTickets } = require('../controller/getCustomerTicket');
const { addReplyToTicket, deleteReply } = require('../controller/AddReply');
const { updateTicketStatus } = require('../controller/updateTicket');
const {  getCustomer, deleteUser, getAgents } = require('../controller/getCustomer');

const Router = express.Router();

Router.post('/register-user',RegisterUser);
Router.post('/login-user',loginUser);
Router.post('/create-ticket',authenticate,createTicket);
Router.post('/add-reply',authenticate,addReplyToTicket);
Router.post('/update-tickets',authenticate,updateTicketStatus);

Router.post('/delete-customer',authenticate,deleteUser);
Router.post('/delete-reply',authenticate,deleteReply);

Router.get('/get-tickets',authenticate,getCustomerTickets);
Router.get('/get-customer',authenticate,getCustomer);
Router.get('/get-agents',authenticate,getAgents);
Router.get('/getall-tickets',authenticate,getAllTickets);
Router.get('/get-user',authenticate,getUser)

module.exports = Router;