import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "./utills";
import ContextProvider from "./Context/ContextProvider";

const RegisterUser = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const getRole = queryParams.get("role");
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(getRole);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: role,
  });
  const { setUser } = useContext(ContextProvider);

  useEffect(() => {
    if (!role) {
      Navigate("/");
    }
  }, [role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await registerUser(formData);
    setLoading(false);
    if (res && res.data.user.role == "customer") {
      setUser(res.data.user);
      sessionStorage.setItem("userToken", res.data.user.token);
      Navigate(`/customer-dashboard`);
    } else if (res && res.data.user.role == "agent") {
      setUser(res.data.user);
      sessionStorage.setItem("userToken", res.data.user.token);
      Navigate(`/agent-dashboard`);
    } else if (res) {
      setUser(res.data.user);
      sessionStorage.setItem("userToken", res.data.user.token);
      Navigate(`/admin-dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Register User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Set Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              defaultValue={role}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={role}>{role}</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            {loading ? "Loading Please wait..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
