import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://altius-mern-assignment.onrender.com";



export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/register-user`, data);
    Swal.fire({
        icon: "success",
        title: "Success",
        text: "successfully register",
      });
    return res
  } catch (error) {
    console.error("Error registering user:", error);
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: error.response?.data?.error || "An error occurred. Please try again.",
    });
    return false;
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/login-user`, data);
    if(res?.data){
        Swal.fire({
            icon: "success",
            title: "Successfully logged in",
          });
        return res;
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.response?.data?.error || "An error occurred. Please try again.",
    });
    return false;
  }
};

export const addReply = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/add-reply`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    if(res?.data){
        Swal.fire({
            icon: "success",
            title: "success",
            text: "reply added successfully",
          });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
        icon: "error",
        title: "can not add reply",
        text: error.response?.data?.error || "An error occurred. Please try again.",
      });
    return false;
  }
};
export const deleteReply = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/delete-reply`,data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    if(res?.data){
        Swal.fire({
            icon: "success",
            title: "success",
            text: "reply deleted successfully",
          });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
        icon: "error",
        title: "can not delete reply",
        text: error.response?.data?.error || "An error occurred. Please try again.",
      });
    return false;
  }
};

export const postTicket = async (ticketData) => {
  try {
    const res = await axios.post(`${API_URL}/create-ticket`, ticketData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    Swal.fire({
        icon:'success',
        title:"success",
        text:'successfully created the ticket'
    })
    return true
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while creating the ticket.");
    return false;
  }
};

export const getCustomerTickets = async () => {
  try {
    const res = await axios.get(`${API_URL}/get-tickets`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const getAllTickets = async () => {
  try {
    const res = await axios.get(`${API_URL}/getall-tickets`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    return res.data
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
    return null;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/delete-customer/?id=${id}`, {}, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    return true
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
    return false;
  }
};

export const updateTicketStatus = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/update-tickets`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    if(res){
        return res.data
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
    return null;
  }
};

export const getAllCustomers = async () => {
  try {
    const res = await axios.get(`${API_URL}/get-customer`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    return res.data
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
    return null;
  }
};

export const getAllAgents = async () => {
  try {
    const res = await axios.get(`${API_URL}/get-agents`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    if(res){

        return res.data
    }
} catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
    return null;
  }
};
