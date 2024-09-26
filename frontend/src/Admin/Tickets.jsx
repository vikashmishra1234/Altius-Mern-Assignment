import React, { useState } from 'react'
import GetTickets from '../serviceagent/AllTickets'
import Sidebar from '../Sidebar'

const Tickets = () => {
    const [nu,setNumberOfTickets] = useState(0)
  return (
    <div className='flex'>
        <Sidebar role='admin'/>
        <div className='w-fit m-auto '>

        <GetTickets list={100} setNumberOfTickets={setNumberOfTickets}/>
        </div>
    </div>
  )
}

export default Tickets