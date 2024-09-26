import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useLocation } from 'react-router-dom';
import GetTickets from './AllTickets';

const Agent = () => {
    const [user, setUser] = useState(null); 
    const [role,setRole] = useState('')
    const [numberOfTickets,setNumberOfTickets] = useState(0)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userParam = queryParams.get('user');

    useEffect(() => {
        if (userParam) {
            try {
                const userData = JSON.parse(decodeURIComponent(userParam));
                setRole(userData.role)
                setUser(userData); 
            } catch (error) {
                console.error("Failed to parse user:", error);
            }
        }
    }, [userParam]);
  return (
    <div className='flex'>
        <Sidebar role={role}/>
        <div className='flex flex-col mt-16 items-center h-[50vh] w-full'>
             <div className='text-4xl mb-10 text-gray-400 font-bold'>
                Welcome {user?.name} to the customer service agent dashboard
             </div>
             <div className='mb-10 text-xl'>
                Total Tickets: {numberOfTickets}
             </div>
             <div>
                <h2 className='text-2xl'>List of all tickets created by customer</h2>
                <GetTickets setNumberOfTickets={setNumberOfTickets}/>
             </div>
            </div>
    </div>
  )
}

export default Agent