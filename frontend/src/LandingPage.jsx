import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContextProvider from './Context/ContextProvider'

const LandingPage = () => {
  const [userExist,setUerExist] = useState(false);
  const [role,setRole] = useState();
  const Navigate = useNavigate();
  const {setUser,user} = useContext(ContextProvider)
  useEffect(()=>{
    const getData = async()=>{
      try {
        const res = await axios.get('https://altius-mern-assignment.onrender.com/get-user',{
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        })
        if(res?.data?.success){
          setUerExist(true);
          setUser(res.data.user)
        }
      } catch (error) {
        console.log(error)
      }
    }
    sessionStorage.getItem("userToken")&&getData()
  },[])
  useEffect(()=>{
    if(user){
      setRole(user.role)
    }
  },[user])

  const handleNavigation = ()=>{
      if(role=='admin'){
          Navigate('/admin-dashboard')
      }
      else if(role=='agent'){
        Navigate('/agent-dashboard')
      }
      else if(role=='customer'){
        Navigate('/customer-dashboard')
      }
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">Welcome to the Helpdesk App</h1>
        <p className="text-xl mb-10">
          Manage tickets, assist customers, and streamline your support with ease.
        </p>

{
  userExist&&role?<button
  type='button'
  onClick={handleNavigation}
  className="bg-white text-blue-500 py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-100 transition"
>
  go to dashboard
</button>:<div className="flex flex-col gap-5 md:flex-row justify-center space-x-4">
  <Link
    to="/register/?role=customer"
    className="bg-white text-blue-500 py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-100 transition"
  >
    Continue as Customer
  </Link>

  <Link
    to="/register/?role=agent"
    className="bg-white text-green-500 py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-green-100 transition"
  >
    Continue as Agent
  </Link>

  <Link
    to="/register/?role=admin"
    className="bg-white text-red-500 py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-red-100 transition"
  >
    Continue as Admin
  </Link>
</div>
}

      {
       !userExist&&<div className="mt-10">
        <Link
          to="/login"
          className="text-white text-lg underline hover:text-gray-200 transition"
        >
          Already have an account? Login
        </Link>
      </div>
      }
      </div>
    </div>
  );
};

export default LandingPage;
