import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = ({ role }) => {
  const Navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    Navigate("/");
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="w-72 h-screen hidden bg-gray-800 text-white md:flex flex-col p-5">
        <h2 className="text-2xl font-semibold mb-8">Helpdesk Registration</h2>
        <ul className="flex flex-col  space-y-4">
          {/* Register as Customer */}
          {role == "customer" && (
            <li>
              <Link
                to="/create-ticket"
                className="block py-2 px-4 text-xl rounded-md hover:bg-gray-700 transition-colors"
              >
                Create Tickets
              </Link>
            </li>
          )}
          {role == "agent" && (
            <>
              <li>
                <Link to="/agent-dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/tickets">All Tickets</Link>
              </li>
            </>
          )}

          {role == "admin" && (
            <>
              <li>
                <Link className="text-lg" to={"/admin-dashboard"}>
                  dashboard
                </Link>
              </li>
              <li>
                <Link className="text-lg" to={"/agents"}>
                  service agents
                </Link>
              </li>
              <li>
                <Link className="text-lg" to={"/customers"}>
                  customer
                </Link>
              </li>
              <li>
                <Link className="text-lg" to={"/tickets"}>
                  tickets
                </Link>
              </li>
            </>
          )}
          <li
            className="text-xl border border-red-500 text-center pt-2 pb-2 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
      {/* for small screen */}
      <div className="md:hidden">
        {/* Navbar */}
        <nav className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-semibold">Helpdesk</div>
            <div className="block md:hidden">
              <button onClick={toggleSidebar}>
                {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
              {role === "customer" && (
                <Link to="/create-ticket" className="hover:text-gray-300">
                  Create Ticket
                </Link>
              )}
              {role === "agent" && (
                <>
                  <span className="hover:text-gray-300 cursor-pointer">
                    Dashboard
                  </span>
                  <span className="hover:text-gray-300 cursor-pointer">
                    Tickets
                  </span>
                </>
              )}
              {role === "admin" && (
                <>
                  <Link to="/admin-dashboard" className="hover:text-gray-300">
                    Dashboard
                  </Link>
                  <Link to="/agents" className="hover:text-gray-300">
                    Service Agents
                  </Link>
                  <Link to="/customers" className="hover:text-gray-300">
                    Customers
                  </Link>
                  <Link to="/tickets" className="hover:text-gray-300">
                    Tickets
                  </Link>
                </>
              )}
              <span
                className="hover:text-gray-300 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </span>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <div
          className={`fixed inset-0 bg-gray-800 text-white p-5 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <h2 className="text-2xl font-semibold mb-8">Helpdesk Registration</h2>
          <ul className="flex flex-col space-y-4">
            {role === "customer" && (
              <li>
                <Link
                  to="/create-ticket"
                  className="block py-2 px-4 text-xl rounded-md hover:bg-gray-700 transition-colors"
                  onClick={toggleSidebar}
                >
                  Create Ticket
                </Link>
              </li>
            )}
            {role === "agent" && (
              <>
                <li>
                  <span
                    className="text-lg cursor-pointer"
                    onClick={toggleSidebar}
                  >
                    Dashboard
                  </span>
                </li>
                <li>
                  <span
                    className="text-lg cursor-pointer"
                    onClick={toggleSidebar}
                  >
                    Tickets
                  </span>
                </li>
              </>
            )}
            {role === "admin" && (
              <>
                <li>
                  <Link
                    className="text-lg"
                    to="/admin-dashboard"
                    onClick={toggleSidebar}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-lg"
                    to="/agents"
                    onClick={toggleSidebar}
                  >
                    Service Agents
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-lg"
                    to="/customers"
                    onClick={toggleSidebar}
                  >
                    Customers
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-lg"
                    to="/tickets"
                    onClick={toggleSidebar}
                  >
                    Tickets
                  </Link>
                </li>
              </>
            )}
            <li
              className="text-xl cursor-pointer"
              onClick={() => {
                toggleSidebar();
                handleLogout();
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
