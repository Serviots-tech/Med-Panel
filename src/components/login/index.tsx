/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { postApi } from '../../apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const LoginComponent: React.FC = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const loggedinUser = await postApi(`/auth/login`, formData);

      if (loggedinUser?.status === 200) {
        localStorage.setItem('accessToken', loggedinUser?.data?.data?.accessToken);
        navigate("/", { replace: true });
      }

      toast.success("User logged in successfully");
    }
    catch (e: any) {
      console.log("🚀 ~ handleSubmit ~ e:", e)
      toast.error("fail to login, check your credentials")
    }
    finally {
      setLoading(false);
      setFormData({ email: '', password: '' })
    }


    //api call goes here   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="form-checkbox"
                name="remember"
              />
              <span className="ml-2">Remember me</span>
            </label>
            {/* <a href="#" className="text-sm text-blue-600 hover:text-blue-700">               
              Forgot password?             
            </a> */}
          </div>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
