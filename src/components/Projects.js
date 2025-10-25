import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Smartphone, Globe, Zap, Github, ExternalLink } from 'lucide-react';
import { GradientText } from './common';
import '../styles/Projects.css';

function Projects() {
  const [filter, setFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Plataforma completa de e-commerce com React, Node.js e PostgreSQL. Sistema de pagamentos integrado e dashboard administrativo.',
      image: '/api/placeholder/400/250',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      features: ['Sistema de pagamentos', 'Dashboard admin', 'API RESTful', 'Deploy automatizado'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      status: 'Concluído'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Aplicativo de gerenciamento de tarefas com interface moderna, drag & drop e sincronização em tempo real.',
      image: '/api/placeholder/400/250',
      category: 'frontend',
      technologies: ['React', 'TypeScript', 'Framer Motion', 'Socket.io'],
      features: ['Drag & drop', 'Tempo real', 'Notificações', 'Tema escuro'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      status: 'Concluído'
    },
    {
      id: 3,
      title: 'API Gateway Microservices',
      description: 'Sistema de microserviços com API Gateway, autenticação JWT e monitoramento avançado.',
      image: '/api/placeholder/400/250',
      category: 'backend',
      technologies: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'MongoDB'],
      features: ['Microserviços', 'Load balancing', 'Rate limiting', 'Monitoring'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      status: 'Concluído'
    },
    {
      id: 4,
      title: 'Mobile Weather App',
      description: 'Aplicativo mobile de previsão do tempo com geolocalização, gráficos interativos e notificações.',
      image: '/api/placeholder/400/250',
      category: 'mobile',
      technologies: ['React Native', 'Expo', 'Redux', 'OpenWeather API'],
      features: ['Geolocalização', 'Gráficos', 'Push notifications', 'Offline mode'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      status: 'Em desenvolvimento'
    },
    {
      id: 5,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Dashboard analítico com IA para insights de negócio, visualizações avançadas e predições.',
      image: '/api/placeholder/400/250',
      category: 'fullstack',
      technologies: ['Python', 'TensorFlow', 'React', 'D3.js', 'FastAPI'],
      features: ['Machine Learning', 'Visualizações', 'Predições', 'Export de dados'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      status: 'Em desenvolvimento'
    },
    {
      id: 6,
      title: 'Blockchain Voting System',
      description: 'Sistema de votação descentralizado usando blockchain para garantir transparência e segurança.',
      image: '/api/placeholder/400/250',
      category: 'blockchain',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
      features: ['Blockchain', 'Smart contracts', 'Descentralizado', 'Auditável'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      status: 'Conceito'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', icon: Globe },
    { id: 'frontend', name: 'Frontend', icon: Palette },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'fullstack', name: 'Full-Stack', icon: Code },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
    { id: 'blockchain', name: 'Blockchain', icon: Zap }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído': return '#10b981';
      case 'Em desenvolvimento': return '#f59e0b';
      case 'Conceito': return '#6366f1';
      default: return '#6b7280';
    }
  };

  return (
    <motion.section 
      id="projects" 
      className="projects"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="projects__container">
        <motion.div className="projects__header" variants={itemVariants}>
          <span className="section-label">Meu trabalho</span>
          <h2 className="section-title">
            Meus <GradientText>Projetos</GradientText>
          </h2>
          <p className="section-subtitle">
            Uma seleção dos meus melhores trabalhos e projetos pessoais
          </p>
        </motion.div>

        <motion.div className="projects__filters" variants={itemVariants}>
          {categories.map((category) => {
            // eslint-disable-next-line no-unused-vars
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                onClick={() => setFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="filter-icon" />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div className="projects__grid" layout>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card glass"
              variants={itemVariants}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.5, delay: index * 0.1 }
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: true }}
            >
              <div className="project-image">
                <div className="project-image-placeholder">
                  <Code className="placeholder-icon" />
                </div>
                <div className="project-overlay">
                  <div className="project-links">
                    <motion.a
                      href={project.github}
                      className="project-link"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      className="project-link"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink />
                    </motion.a>
                  </div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span 
                    className="project-status"
                    style={{ backgroundColor: getStatusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-features">
                  {project.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>

                <div className="project-tech">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="projects__cta" variants={itemVariants}>
          <p>Interessado em ver mais?</p>
          <motion.a
            href="https://github.com/JaegerCaiser"
            className="btn btn--secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="btn-icon" />
            Ver todos no GitHub
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Projects;