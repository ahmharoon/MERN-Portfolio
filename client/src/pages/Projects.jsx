import { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/api/projects');
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const displayProjects = projects;

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Dynamic Project Gallery</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A showcase of my recent work, featuring complex full-stack applications, AI integrations, and real-time systems.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {displayProjects.map((project) => (
            <motion.div 
              key={project._id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
