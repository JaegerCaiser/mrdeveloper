
import { motion } from 'framer-motion';
import { itemVariants } from './motionVariants';
import './Card.css';

function Card({ 
  children, 
  className = '', 
  variant = 'glass',
  hover = true,
  delay = 0,
  ...props 
}) {
  const cardClasses = `card card--${variant} ${className}`;

  const motionProps = {
    className: cardClasses,
    variants: itemVariants,
    transition: { delay },
    ...props
  };

  if (hover) {
    motionProps.whileHover = {
      y: -10,
      scale: 1.02,
      transition: { duration: 0.3 }
    };
  }

  return (
    <motion.div {...motionProps}>
      {children}
    </motion.div>
  );
}

export default Card;