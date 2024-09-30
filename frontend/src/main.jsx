import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextState from './Context/ContexState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ContextState>
    <App />
   </ContextState>
  </StrictMode>,
)
