import { useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', content: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/api/messages', formData);
      setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', content: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    }
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 md:p-12 rounded-2xl"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Get In Touch</h1>
        
        {status.message && (
          <div className={`p-4 mb-6 rounded-lg ${status.type === 'success' ? 'bg-success/20 text-success' : 'bg-red-500/20 text-red-400'}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input
                type="text"
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
            <input
              type="text"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
            <textarea
              required
              rows={6}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
