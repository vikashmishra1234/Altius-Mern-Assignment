import React, { useContext, useEffect, useState } from 'react'
import GetTickets from '../serviceagent/AllTickets'
import Sidebar from '../Sidebar'
import ContextProvider from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Tickets = () => {
    const [numberOfTickets,setNumberOfTickets] = useState(0);
    const {user} = useContext(ContextProvider);

 

  return (
    <div className='flex'>
        <Sidebar role={user?.role}/>
        <div className='w-fit m-auto '>

        <GetTickets list={100} setNumberOfTickets={setNumberOfTickets}/>
        </div>
    </div>
  )
}

export default Tickets