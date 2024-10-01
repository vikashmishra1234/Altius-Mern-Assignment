import React, { useContext, useEffect, useState } from 'react';
import { loginUser } from './utills';
import { useNavigate } from 'react-router-dom';
import ContextProvider from './Context/ContextProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false)
  const Navigate = useNavigate();
  const {setUser} = useContext(ContextProvider)
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const res = await loginUser({email,password});
    setLoading(false)
    if(res&&res.data.user.role=='customer'){
      setUser(res.data.user)
      sessionStorage.setItem("userToken",res.data.user.token)
      Navigate(`/customer-dashboard`);
    }
    else if(res&&res.data.user.role=='agent'){
      setUser(res.data.user)
      sessionStorage.setItem("userToken",res.data.user.token)
      Navigate(`/agent-dashboard`);
    }
    else if(res){
      setUser(res.data.user)
      sessionStorage.setItem("userToken",res.data.user.token)
      Navigate(`/admin-dashboard`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded shadow hover:bg-blue-600 transition"
          >
            {
              loading?'loading please wait...':'login'
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
