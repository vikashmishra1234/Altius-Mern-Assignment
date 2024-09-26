import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useLocation } from 'react-router-dom';
import GetTickets from '../serviceagent/AllTickets';
import { getAllCustomers } from '../utills';


const Admin = () => {
    const [user, setUser] = useState(null); 
    const [role,setRole] = useState('')
    const [customer,setCustomers] = useState([])
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
    useEffect(()=>{
        (async()=>{
            const res = await getAllCustomers();
            if(res){

                setCustomers(res.coustomer)
            }
        })()
    },[])

  return (
    <div className='flex flex-col md:flex-row'>
        <Sidebar role='admin'/>
        <div className='flex flex-col items-center mt-16  w-full'>
             <div className='text-4xl md:w-[650px] w-[95%] mt-10 md:mt-0 mb-10 text-gray-400 font-bold'>
               Welcome to the admin dashboard
             </div>
            <div className='text-2xl flex flex-col md:flex-row items-center md:w-[650px] w-[95%] border p-3 mb-16'>
               <span> Total Tickets: {numberOfTickets}</span>
               <span className='ml-10'> Total Coustomer: {customer.length}</span>
            </div>
            <div>
            <h4 className='text-2xl mt-3'>Here are some recently created tickets</h4>
            <Link className='text-blue-500' to='/tickets'>click here to view all</Link>
            <GetTickets list={3} setNumberOfTickets={setNumberOfTickets}/>
            </div>
            </div>
    </div>
  )
}

export default Admin