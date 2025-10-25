import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, MessageCircle, Send } from 'lucide-react';
import { GradientText } from './common';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // eslint-disable-next-line no-console
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'matheus@example.com',
      href: 'mailto:matheus@example.com',
      color: '#ea4335'
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: '+55 (11) 99999-9999',
      href: 'tel:+5511999999999',
      color: '#34a853'
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'São Paulo, Brasil',
      href: 'https://maps.google.com',
      color: '#4285f4'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/JaegerCaiser',
      color: '#333'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/matheus-caiser',
      color: '#0077b5'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: 'https://twitter.com/matheuscaiser',
      color: '#1da1f2'
    },
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      url: 'https://wa.me/5511999999999',
      color: '#25d366'
    }
  ];

  return (
    <motion.section 
      id="contact" 
      className="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="contact__container">
        <motion.div className="contact__header" variants={itemVariants}>
          <span className="section-label">Vamos conversar</span>
          <h2 className="section-title">
            Entre em <GradientText>Contato</GradientText>
          </h2>
          <p className="section-subtitle">
            Tenho sempre interesse em oportunidades e projetos interessantes
          </p>
        </motion.div>

        <div className="contact__content">
          <motion.div className="contact__info" variants={itemVariants}>
            <div className="contact__info-content glass">
              <h3>Informações de Contato</h3>
              <p>
                Estou sempre aberto para discutir novos projetos, oportunidades criativas 
                ou simplesmente conversar sobre tecnologia. Não hesite em entrar em contato!
              </p>

              <div className="contact__details">
                {contactInfo.map((item, index) => {
                  // eslint-disable-next-line no-unused-vars
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="contact-item"
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { duration: 0.5, delay: index * 0.1 }
                      }}
                      viewport={{ once: true }}
                    >
                      <div 
                        className="contact-icon"
                        style={{ backgroundColor: `${item.color}20`, color: item.color }}
                      >
                        <Icon />
                      </div>
                      <div className="contact-text">
                        <span className="contact-label">{item.label}</span>
                        <span className="contact-value">{item.value}</span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <div className="social-section">
                <h4>Redes Sociais</h4>
                <div className="social-links">
                  {socialLinks.map((social, index) => {
                    // eslint-disable-next-line no-unused-vars
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        className="social-link"
                        style={{ '--social-color': social.color }}
                        whileHover={{ 
                          scale: 1.1,
                          y: -5,
                          backgroundColor: social.color
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.5, delay: index * 0.1 }
                        }}
                        viewport={{ once: true }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon />
                        <span className="social-tooltip">{social.name}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="contact__form" variants={itemVariants}>
            <form onSubmit={handleSubmit} className="contact-form glass">
              <h3>Envie uma Mensagem</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Seu email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Assunto"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Sua mensagem..."
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="form-input form-textarea"
                />
              </div>

              <motion.button
                type="submit"
                className="btn btn--primary form-submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <motion.div 
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <Send className="btn-icon" />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;