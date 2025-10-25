
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Instagram, MessageCircle } from 'lucide-react';
import './SocialLinks.css';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  email: Mail,
  twitter: Twitter,
  instagram: Instagram,
  whatsapp: MessageCircle
};

function SocialLinks({ 
  links = [], 
  variant = 'default',
  size = 'medium',
  className = '' 
}) {
  const containerClasses = `social-links social-links--${variant} social-links--${size} ${className}`;

  return (
    <div className={containerClasses}>
      {links.map((link, index) => {
        const Icon = iconMap[link.type.toLowerCase()] || Github;
        
        return (
          <motion.a
            key={index}
            href={link.url}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.2, 
              rotate: index % 2 === 0 ? 5 : -5 
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Icon />
            <span className="social-link__tooltip">{link.label}</span>
          </motion.a>
        );
      })}
    </div>
  );
}

export default SocialLinks;