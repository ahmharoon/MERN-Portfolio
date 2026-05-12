import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/admin/login', {
        username,
        password,
      });
      login(data);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 rounded-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">CMS Login</h2>
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              required
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors mt-6"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
