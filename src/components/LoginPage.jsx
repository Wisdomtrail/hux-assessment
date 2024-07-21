import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../images/image1.jpeg';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://${global.BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        setMessage('Login successful! Redirecting to contacts...');
        setTimeout(() => navigate('/contacts'), 2000);
      } else {
        setMessage(result.message || 'An error occurred during login.');
      }
    } catch (error) {
      setMessage('An error occurred during login.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
        <h1 className="text-3xl mb-2">Welcome Back</h1>
        <p className="mb-6">Login to your account</p>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Login
          </button>
        </form>
        {message && (
          <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded text-center">
            {message}
          </div>
        )}
        <p className="mt-4">
          Don't have an account? <a href="/signup" className="text-purple-600">Sign up</a>
        </p>
      </div>
      <div
        className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="bg-white bg-opacity-50 p-6 rounded mb-4 text-center">
          <h2 className="text-2xl mb-2">Easy to manage</h2>
          <p>Simplify your contact organization</p>
        </div>
        <div className="bg-white bg-opacity-50 p-6 rounded mb-4 text-center">
          <h2 className="text-2xl mb-2">7+ years experience</h2>
          <p>Trusted by professionals worldwide</p>
        </div>
        <div className="bg-white bg-opacity-50 p-6 rounded text-center">
          <h2 className="text-2xl mb-2">Automated Workflows</h2>
          <p>Streamline your contact management process</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
