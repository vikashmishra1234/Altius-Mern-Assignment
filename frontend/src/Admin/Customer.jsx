import React, { useEffect, useState } from "react";
import { getAllCustomers, deleteCustomer } from "../utills";
import Sidebar from "../Sidebar";
import userImage from '../assets/user.png'
const Customer = () => {
  const [customer, setCustomers] = useState([]);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllCustomers();
      setLoading(false);
      if (res) {
        setCustomers(res.coustomer);
      }
    })();
  }, [change]);
  const handleDelete = async (id) => {
     await deleteCustomer(id);

    setChange(!change);
  };
  if (loading) {
    return <h2>loading please wait ...</h2>;
  }
  return (
    <>
      <div className="flex">
        <Sidebar role={"admin"} />

        <div className="flex  flex-col mt-16 items-center h-[50vh] w-full">
          {customer?.map((item, ind) => (
            <div key={ind} className="flex  mb-10 border-b gap-8 items-center">
              <div>
                <img
                  className="w-[85%]"
                  src={userImage}
                  alt="user.png"
                />
              </div>
              <div className="flex flex-col text-xl">
                <span className="mt-2">{item.name}</span>
                <span className="mt-1">{item.email}</span>
                <span
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-400 p-1 mt-1 text-center text-white rounded cursor-pointer"
                >
                  delete this user
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Customer;
