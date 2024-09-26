const express = require('express');
const { RegisterUser } = require('../controller/RegisterUser');
const { authenticate } = require('../verifyAuth');
const { createTicket } = require('../controller/createTicket');
const { getCustomerTickets, getAllTickets } = require('../controller/getCustomerTicket');
const { addReplyToTicket } = require('../controller/AddNote');
const { updateTicketStatus } = require('../controller/updateTicket');
const {  getCustomer, deleteUser, getAgents } = require('../controller/getCustomer');

const Router = express.Router();

Router.post('/register-user',RegisterUser);
Router.post('/create-ticket',authenticate,createTicket);
Router.post('/add-note',authenticate,addReplyToTicket);
Router.post('/update-tickets',authenticate,updateTicketStatus);

Router.post('/delete-customer',authenticate,deleteUser);

Router.get('/get-tickets',authenticate,getCustomerTickets);
Router.get('/get-customer',authenticate,getCustomer);
Router.get('/get-agents',authenticate,getAgents);
Router.get('/getall-tickets',authenticate,getAllTickets);

module.exports = Router;