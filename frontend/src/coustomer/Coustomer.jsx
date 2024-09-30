import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link, useLocation } from "react-router-dom";
import GetTickets from "./GetTickets";
import userImage from "../assets/user.png";
import ContextProvider from "../Context/ContextProvider";

const Coustomer = () => {
  const [role, setRole] = useState("");
  const { user } = useContext(ContextProvider);
  console.log(user);
  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  return (
    <>
      <div className="flex">
        <Sidebar role={"customer"} />
        <div className="flex flex-col mt-16 items-center h-[50vh] w-full">
          {user ? (
            <div className="flex mb-10 gap-8 items-center">
              <div>
                <img className="w-[95%]" src={userImage} alt="user.png" />
              </div>
              <div className="flex flex-col text-xl">
                <span className="mt-2">{user.name}</span>
                <span className="mt-2">{user.email}</span>
                <Link
                  className="mt-4 pb-[6px] pt-[5px] pr-6 pl-6 text-lg md:text-xl bg-green-600 w-fit  text-center text-white "
                  to="/create-ticket"
                >
                  create ticket
                </Link>
              </div>
            </div>
          ) : (
            <h1>No user information available.</h1>
          )}
          <GetTickets />
        </div>
      </div>
    </>
  );
};

export default Coustomer;
