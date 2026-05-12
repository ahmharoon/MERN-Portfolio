import { useState, useEffect } from 'react';
import api from '../../api';

const ExperienceManager = ({ token }) => {
  const [experiences, setExperiences] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExperience, setCurrentExperience] = useState({
    company: '',
    role: '',
    description: '',
    year: '',
  });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data } = await api.get('/api/experiences');
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await api.delete(`/api/experiences/${id}`, config);
        fetchExperiences();
      } catch (error) {
        console.error('Error deleting experience', error);
      }
    }
  };

  const handleEditClick = (experience) => {
    setCurrentExperience(experience);
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setCurrentExperience({
      company: '',
      role: '',
      description: '',
      year: '',
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentExperience._id) {
        // Update existing
        await api.put(`/api/experiences/${currentExperience._id}`, currentExperience, config);
      } else {
        // Create new
        await api.post('/api/experiences', currentExperience, config);
      }
      setIsEditing(false);
      fetchExperiences();
    } catch (error) {
      console.error('Error saving experience', error);
      alert('Failed to save experience. Check console for details.');
    }
  };

  return (
    <div className="glass p-6 rounded-xl mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Experience Management</h2>
        {!isEditing && (
          <button 
            onClick={handleAddNewClick}
            className="bg-primary hover:bg-blue-600 px-4 py-2 rounded text-white text-sm font-semibold transition-colors"
          >
            + Add New Experience
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Company</label>
              <input type="text" required className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-primary outline-none" value={currentExperience.company} onChange={(e) => setCurrentExperience({...currentExperience, company: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Role</label>
              <input type="text" required className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-primary outline-none" value={currentExperience.role} onChange={(e) => setCurrentExperience({...currentExperience, role: e.target.value})} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Duration / Year</label>
              <input type="text" required placeholder="e.g. 05/24 - 06/24" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-primary outline-none" value={currentExperience.year} onChange={(e) => setCurrentExperience({...currentExperience, year: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea required rows="3" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-primary outline-none" value={currentExperience.description} onChange={(e) => setCurrentExperience({...currentExperience, description: e.target.value})}></textarea>
          </div>

          <div className="flex space-x-4 pt-4">
            <button type="submit" className="bg-success hover:bg-green-600 text-white px-6 py-2 rounded font-semibold transition-colors">Save Experience</button>
            <button type="button" onClick={handleCancel} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-semibold transition-colors">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="py-3 px-4 font-semibold">Company</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Duration</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">No experiences found. Add one above!</td>
                </tr>
              ) : (
                experiences.map((exp) => (
                  <tr key={exp._id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{exp.company}</td>
                    <td className="py-3 px-4 text-primary">{exp.role}</td>
                    <td className="py-3 px-4 text-gray-400">{exp.year}</td>
                    <td className="py-3 px-4 text-right space-x-3">
                      <button onClick={() => handleEditClick(exp)} className="text-gray-400 hover:text-white transition-colors">Edit</button>
                      <button onClick={() => handleDelete(exp._id)} className="text-red-500 hover:text-red-400 transition-colors">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;
