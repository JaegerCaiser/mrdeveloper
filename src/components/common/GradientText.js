
import './GradientText.css';

function GradientText({ 
  children, 
  gradient = 'primary', 
  className = '',
  as = 'span',
  ...props 
}) {
  // eslint-disable-next-line no-unused-vars
  const Component = as;
  const classes = `gradient-text gradient-text--${gradient} ${className}`;

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default GradientText;