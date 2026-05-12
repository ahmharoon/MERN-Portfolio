import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import { AuthContext } from '../../context/AuthContext';
import ProjectManager from '../../components/admin/ProjectManager';

const Dashboard = () => {
  const { adminInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [emails, setEmails] = useState('');
  const [settingsStatus, setSettingsStatus] = useState('');

  useEffect(() => {
    if (!adminInfo) {
      navigate('/admin/login');
    } else {
      fetchMessages();
      fetchSettings();
    }
  }, [adminInfo, navigate]);

  const fetchSettings = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
      const { data } = await api.get('/api/settings/notifications', config);
      if (data && data.emails) {
        setEmails(data.emails.join(', '));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setSettingsStatus('Saving...');
    try {
      const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
      const emailArray = emails.split(',').map(e => e.trim()).filter(e => e !== '');
      await api.put('/api/settings/notifications', { emails: emailArray }, config);
      setSettingsStatus('Settings Saved!');
      setTimeout(() => setSettingsStatus(''), 3000);
    } catch (error) {
      setSettingsStatus('Failed to save');
      setTimeout(() => setSettingsStatus(''), 3000);
    }
  };

  const fetchMessages = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };
      const { data } = await api.get('/api/messages', config);
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!adminInfo) return null;

  return (
    <div className="pt-24 pb-8 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="glass p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Email Notification Settings</h2>
          <form onSubmit={handleUpdateSettings} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Emails to notify (comma separated)</label>
              <input
                type="text"
                placeholder="youremail@example.com"
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button type="submit" className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition-colors">
                Save Settings
              </button>
              {settingsStatus && <span className="text-sm text-gray-400">{settingsStatus}</span>}
            </div>
          </form>
        </div>

        <div className="glass p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Recent Messages</h2>
          {messages.length === 0 ? (
            <p className="text-gray-400">No messages yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map(msg => (
                <div key={msg._id} className="bg-gray-900 p-4 rounded border border-gray-800">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-primary">{msg.name} ({msg.email})</span>
                    <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-sm font-semibold mb-2">{msg.subject}</h4>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Projects Management Component */}
        <ProjectManager token={adminInfo.token} />
      </div>
    </div>
  );
};

export default Dashboard;
