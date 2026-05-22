import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api';
import ProjectCard from '../components/ProjectCard';

const formatYear = (year, present) => {
  if (!year) return '';
  if (present) {
    const lower = year.toLowerCase();
    if (lower.endsWith('present')) {
      return year;
    }
    return `${year} - Present`;
  }
  return year;
};

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/api/projects');
        setFeaturedProjects(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured projects', error);
      }
    };

    const fetchExperiences = async () => {
      try {
        const { data } = await api.get('/api/experiences');
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences', error);
      }
    };

    fetchProjects();
    fetchExperiences();
  }, []);



  const education = {
    school: 'UET Lahore',
    degree: 'Bachelor of Science in Computer Science',
    details: 'CS Finalist (GPA 3.1). Expected graduation: August 2026.'
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-24">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Hi, I'm <span className="text-primary">Ahmad Haroon</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
          Software Engineer & Full-Stack MERN Developer specializing in Node.js backend architecture and AI integration.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link to="/projects" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            View My Work
          </Link>
          <Link to="/contact" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-colors border border-gray-700">
            Contact Me
          </Link>
        </div>
      </motion.section>

      {/* Featured Projects Section */}
      <section>
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Link to="/projects" className="text-primary hover:text-blue-400 font-semibold transition-colors">
            View All Projects &rarr;
          </Link>
        </div>
        
        {featuredProjects.length === 0 ? (
          <div className="text-center text-gray-500 py-10">Loading projects...</div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {featuredProjects.map((project) => (
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
      </section>

      {/* Experience Section */}
      <section>
        <h2 className="text-3xl font-bold mb-10 text-center">Professional Experience</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-900 group-[.is-active]:bg-primary text-gray-500 group-[.is-active]:text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow flex-col absolute left-0 md:left-1/2 -translate-x-1/2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="glass p-6 rounded-xl w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-14 md:ml-0 hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-xl text-primary">{exp.role}</h3>
                  <span className="text-sm text-gray-400">{formatYear(exp.year, exp.present)}</span>
                </div>
                <h4 className="text-lg text-white mb-4">{exp.company}</h4>
                <p className="text-gray-400 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education & Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Education</h2>
          <div className="glass p-8 rounded-2xl h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-2">{education.school}</h3>
            <h4 className="text-xl text-primary mb-4">{education.degree}</h4>
            <p className="text-gray-400">{education.details}</p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Let's Work Together</h2>
          <div className="glass p-8 rounded-2xl h-full flex flex-col justify-center items-center md:items-start text-center md:text-left border-primary/20 bg-primary/5">
            <h3 className="text-2xl font-bold text-white mb-4">Have an idea or a project in mind?</h3>
            <p className="text-gray-300 mb-8">
              I am currently open to new opportunities and exciting freelance projects. 
              Let's hop on a quick call and discuss how I can help bring your vision to life.
            </p>
            <Link to="/contact" className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center inline-block">
              Get in Touch
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
