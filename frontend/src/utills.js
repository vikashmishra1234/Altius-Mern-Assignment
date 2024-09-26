import axios from "axios";
import Swal from "sweetalert2";

export const addNote = async(data)=>{
    try {
        const response = await axios.post('https://altius-mern-assignment.onrender.com/add-note', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`, // Assuming you store the JWT in session storage
            },
        });

        if (response.data) { // Check the response for a success property
            alert('reply added success!');
            return true
        } else {
            alert(response.data.message || 'Failed to add note on ticket.');
            return false
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurredt.');
        return false
    }
}
export const postTicket = async(ticketData)=>{
    try {
        const response = await axios.post('https://altius-mern-assignment.onrender.com/create-ticket', ticketData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`, // Assuming you store the JWT in session storage
            },
        });

        if (response.data.success) { // Check the response for a success property
            alert('Ticket created successfully!');
        } else {
            alert(response.data.message || 'Failed to create ticket.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the ticket.');
    }
}
export const getCustomberTickets = async()=>{
    try {
        const response = await axios.get('https://altius-mern-assignment.onrender.com/get-tickets', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`, // Assuming you store the JWT in session storage
            },
        });

        if (response.data.success) { 
           return response.data
        } else {
            console.log(response)
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}
export const getAllTickets = async()=>{
    try {
        const response = await axios.get('https://altius-mern-assignment.onrender.com/getall-tickets', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`, // Assuming you store the JWT in session storage
            },
        });

        if (response.data.success) { 
           return response.data
        } else {
            console.log(response)
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        alert("something went wrong")
        return null
    }
}
export const deleteCustomer = async(id)=>{
    const data = {}
    try {
        const response = await axios.post(`https://altius-mern-assignment.onrender.com/delete-customer/?id=${id}`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`, 
            }
        });

        if (response.data.message) { 
          Swal.fire({
            icon:'success',
            title:'user is deleted'
          })
          return true
        } else {
            console.log(response)
            alert("unable to delete")
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        alert("something went wrong")
        return null
    }
}
export const updateTicketStatus = async(data)=>{
    try {
        const response = await axios.post('https://altius-mern-assignment.onrender.com/update-tickets',data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`, 
            },
        });

        if (response.data.message) { 
           return response.data
        } else {
            console.log(response)
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        alert("something went wrong")
        return null
    }
}
export const getAllCustomers = async(data)=>{
    try {
        const response = await axios.get('https://altius-mern-assignment.onrender.com/get-customer', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`, 
            },
        });

        if (response.data.success) { 
           return response.data
        } else {
            console.log(response)
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        alert("something went wrong")
        return null
    }
}
export const getAllAgents = async()=>{
    try {
        const response = await axios.get('https://altius-mern-assignment.onrender.com/get-agents', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`, 
            },
        });

        if (response.data.success) { 
           return response.data
        } else {
            console.log(response)
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        alert("something went wrong")
        return null
    }
}