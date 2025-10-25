
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from './motionVariants';
import './Section.css';

function Section({ 
  children, 
  id, 
  className = '', 
  title, 
  subtitle,
  background = 'default',
  ...props 
}) {
  const sectionClasses = `section section--${background} ${className}`;

  return (
    <motion.section 
      id={id}
      className={sectionClasses}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      {...props}
    >
      <div className="section__container">
        {(title || subtitle) && (
          <motion.div className="section__header" variants={itemVariants}>
            {title && (
              <h2 className="section__title">
                {typeof title === 'string' && title.includes('gradient-text') ? (
                  <span dangerouslySetInnerHTML={{ __html: title }} />
                ) : (
                  title
                )}
              </h2>
            )}
            {subtitle && <p className="section__subtitle">{subtitle}</p>}
          </motion.div>
        )}
        
        <div className="section__content">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

export default Section;