import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError('');
      localStorage.setItem('admin_logged_in', 'true');
      if (onLogin) onLogin();
      navigate('/'); // Redirect to dashboard after login
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <form onSubmit={handleSubmit} className="bg-gray-900/95 p-8 rounded-3xl shadow-2xl flex flex-col gap-6 w-full max-w-md border border-blue-700 mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-wide drop-shadow">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          autoFocus
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          required
        />
        {error && <div className="text-red-400 text-center text-base font-semibold">{error}</div>}
        <button type="submit" className="w-full py-3 bg-blue-700 hover:bg-pink-500 text-white font-bold rounded-xl text-lg shadow transition">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
