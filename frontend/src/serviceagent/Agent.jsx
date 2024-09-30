import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GetTickets from './AllTickets';
import ContextProvider from '../Context/ContextProvider';

const Agent = () => {
    const [role,setRole] = useState('')
    const [numberOfTickets,setNumberOfTickets] = useState(0)
    const {user} = useContext(ContextProvider);
    const Navigate = useNavigate();
    useEffect(() => {
        if(user&&user.role!='agent'){
            Navigate('/login')
        }
        if (user) {
            setRole(user.role)
        }
    }, [user]);
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
                <h2 className='text-2xl'>Recent tickets created by customer</h2>
                <GetTickets list={3} setNumberOfTickets={setNumberOfTickets}/>
             </div>
            </div>
    </div>
  )
}

export default Agent