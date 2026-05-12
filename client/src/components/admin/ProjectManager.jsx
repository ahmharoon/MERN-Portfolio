import { useState, useEffect } from 'react';
import api from '../../../api';

const ProjectManager = ({ token }) => {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    liveLink: '',
    githubLink: '',
    techStack: '',
    highlights: '',
  });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/api/projects');
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/api/projects/${id}`, config);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project', error);
      }
    }
  };

  const handleEditClick = (project) => {
    setCurrentProject({
      ...project,
      techStack: project.techStack ? project.techStack.join(', ') : '',
      highlights: project.highlights ? project.highlights.join(', ') : '',
    });
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setCurrentProject({
      title: '',
      description: '',
      category: '',
      imageUrl: '',
      liveLink: '',
      githubLink: '',
      techStack: '',
      highlights: '',
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const configWithFile = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.post('/api/upload', formData, configWithFile);
      setCurrentProject({ ...currentProject, imageUrl: data.imageUrl });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert('Image upload failed. Ensure you have valid Cloudinary keys in the server .env');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format the comma-separated strings back into arrays
    const formattedProject = {
      ...currentProject,
      techStack: currentProject.techStack.split(',').map(item => item.trim()).filter(item => item !== ''),
      highlights: currentProject.highlights.split(',').map(item => item.trim()).filter(item => item !== ''),
    };

    try {
      if (currentProject._id) {
        // Update existing
        await api.put(`/api/projects/${currentProject._id}`, formattedProject, config);
      } else {
        // Create new
        await api.post('/api/projects', formattedProject, config);
      }
      setIsEditing(false);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project', error);
      alert('Failed to save project. Check console for details.');
    }
  };

  return (
    <div className="glass p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects Management</h2>
        {!isEditing && (
          <button 
            onClick={handleAddNewClick}
            className="bg-primary hover:bg-blue-600 px-4 py-2 rounded text-white text-sm font-semibold transition-colors"
          >
            + Add New Project
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input type="text" required className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-primary outline-none" value={currentProject.title} onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <input type="text" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-primary outline-none" value={currentProject.category} onChange={(e) => setCurrentProject({...currentProject, category: e.target.value})} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea required rows="3" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-primary outline-none" value={currentProject.description} onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}></textarea>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Tech Stack (comma separated)</label>
            <input type="text" placeholder="React, Node.js, MongoDB" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-primary outline-none" value={currentProject.techStack} onChange={(e) => setCurrentProject({...currentProject, techStack: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Highlights (comma separated)</label>
            <textarea rows="2" placeholder="Implemented X, Optimized Y" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-primary outline-none" value={currentProject.highlights} onChange={(e) => setCurrentProject({...currentProject, highlights: e.target.value})}></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Image Upload (Cloudinary)</label>
              <input type="file" accept="image/*" onChange={uploadFileHandler} className="w-full bg-black border border-gray-700 rounded px-3 py-1.5 text-white focus:border-primary outline-none" />
              {uploading && <p className="text-xs text-primary mt-1">Uploading...</p>}
              {currentProject.imageUrl && !uploading && <p className="text-xs text-success mt-1 truncate">Image Uploaded Successfully</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Live Link</label>
              <input type="text" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-primary outline-none" value={currentProject.liveLink} onChange={(e) => setCurrentProject({...currentProject, liveLink: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">GitHub Link</label>
              <input type="text" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-primary outline-none" value={currentProject.githubLink} onChange={(e) => setCurrentProject({...currentProject, githubLink: e.target.value})} />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button type="submit" className="bg-success hover:bg-green-600 text-white px-6 py-2 rounded font-semibold transition-colors">Save Project</button>
            <button type="button" onClick={handleCancel} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-semibold transition-colors">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="py-3 px-4 font-semibold">Project Title</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-500">No projects found. Add one above!</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{project.title}</td>
                    <td className="py-3 px-4 text-primary">{project.category || 'None'}</td>
                    <td className="py-3 px-4 text-right space-x-3">
                      <button onClick={() => handleEditClick(project)} className="text-gray-400 hover:text-white transition-colors">Edit</button>
                      <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-400 transition-colors">Delete</button>
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

export default ProjectManager;
