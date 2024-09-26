import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { Link, useLocation } from 'react-router-dom';
import GetTickets from './GetTickets';

const Coustomer = () => {
    const [user, setUser] = useState(null); 
    const [role,setRole] = useState('');
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
        <>
        <div className='flex'>
            <Sidebar role={role} />
            <div className='flex flex-col mt-16 items-center h-[50vh] w-full'>
                {user ? (
                    <div className='flex mb-10 gap-8 items-center'>
                        <div>
                            <img className='w-[95%]'  src="/src/assets/user.png" alt="user.png" />
                        </div>
                        <div className='flex flex-col text-xl'>
                            <span className='mt-2'>{user.name}</span>
                            <span className='mt-2'>{user.email}</span>
                            <Link className='mt-2 text-lg md:text-xl bg-green-600 w-fit p-1 md:p-2 text-center text-white rounded-lg' to='/create-ticket'>create support ticket</Link>
                        </div>
                    </div>
                ) : (
                    <h1>No user information available.</h1>
                )}
                  <GetTickets/>
            </div>
        </div>
        </>
    );
}

export default Coustomer;
