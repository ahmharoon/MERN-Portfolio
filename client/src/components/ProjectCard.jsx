import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass rounded-xl overflow-hidden shadow-lg flex flex-col h-full transform-gpu"
      style={{ perspective: 1000 }}
    >
      <div className="h-48 overflow-hidden bg-gray-800">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          {project.category && (
            <span className="text-xs font-semibold px-2 py-1 bg-primary/20 text-primary rounded-full">
              {project.category}
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
        
        {project.highlights && project.highlights.length > 0 && (
          <ul className="list-disc list-inside text-sm text-gray-300 mb-4 space-y-1">
            {project.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-4 mt-auto">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub className="w-4 h-4 mr-1" /> Code
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-primary hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-1" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
