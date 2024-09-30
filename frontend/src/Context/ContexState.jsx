import React, { useEffect, useState } from 'react'
import ContextProvider from './ContextProvider.jsx';


const ContextState = (props) => {
const [user,setUser] = useState();
  return (
    <ContextProvider.Provider value={{user,setUser}} >
        {props.children}
    </ContextProvider.Provider>
  )
}

export default ContextState
