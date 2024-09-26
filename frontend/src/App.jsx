import React from 'react'
import Sidebar from './Sidebar'
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import LandingPage from './LandingPage'
import RegisterUser from './RegisterUser'
import Coustomer from './coustomer/Coustomer'
import CreateTicket from './coustomer/CreateTicket'
import Login from './Login'
import Agent from './serviceagent/Agent'
import Admin from './Admin/Admin'
import Tickets from './Admin/Tickets'
import Customer from './Admin/Customer'
import AllAgents from './Admin/AllAgents'


const App = () => {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Registration Routes */}
        <Route path="/register-customer" element={<RegisterUser />} />
        <Route path="/register-agent" element={<RegisterUser />} />
        <Route path="/register-admin" element={<RegisterUser />} />
        <Route path='/coustomer-dashboard' element={<Coustomer/>}/>
        <Route path='/create-ticket' element={<CreateTicket/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/agent-dashboard' element={<Agent/>}/>
        <Route path='/admin-dashboard' element={<Admin/>}/>
        <Route path='/tickets' element={<Tickets/>}/>
        <Route path='/customers' element={<Customer/>}/>
        <Route path='/agents' element={<AllAgents/>}/>
      </Routes>
      </BrowserRouter>
  </div>
  )
}

export default App