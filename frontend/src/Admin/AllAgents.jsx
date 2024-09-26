import React, { useEffect, useState } from "react";
import { getAllAgents,deleteCustomer } from "../utills";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import user from '../assets/user.png'

const AllAgents = () => {
  const [customer, setCustomers] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await getAllAgents();
      console.log(res);
      setCustomers(res.coustomer);
    })();
  }, [change]);
  const handleDelete = async(id)=>{
    const res = await deleteCustomer(id);
    setChange(!change)
  }
  return (
    <>
      <div className="flex">
        <Sidebar role={"admin"} />
        
          <div className="flex  flex-col mt-16 items-center h-[50vh] w-full">
            <h2 className="text-2xl mb-5">list of all customer service agent</h2>
            {
               customer?.map((item,ind)=>(
                <div className='flex  mb-10 border-b gap-8 items-center'>
                <div>
                    <img className='w-[85%]'  src={user} alt="user.png" />
                </div>
                <div className='flex flex-col text-xl'>
                    <span className='mt-2'>{item.name}</span>
                    <span className='mt-1'>{item.email}</span>
                    <span onClick={()=>handleDelete(item._id)} className='bg-red-400 p-1 mt-1 text-center text-white rounded cursor-pointer'>delete this user</span>
                </div>
            </div>
               ))
            }
          </div>
        
      </div>
    </>
  );
};

export default AllAgents;
