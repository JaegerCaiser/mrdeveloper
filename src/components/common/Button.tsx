import { ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";
import "./Button.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  disabled?: boolean;
  icon?: ReactNode;
  href?: string | null;
  [key: string]: any;
}

function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  icon = null,
  href = null,
  ...props
}: ButtonProps) {
  const buttonClasses = `btn btn--${variant} btn--${size} ${
    disabled ? "btn--disabled" : ""
  }`;

  const buttonContent = (
    <>
      <span>{children}</span>
      {icon && <span className="btn-icon">{icon}</span>}
    </>
  );

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.05, y: -2 },
    whileTap: disabled ? {} : { scale: 0.95 },
    className: buttonClasses,
    onClick: disabled ? undefined : onClick,
    ...props,
  };

  if (href && !disabled) {
    return (
      <motion.a href={href} {...motionProps}>
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} disabled={disabled}>
      {buttonContent}
    </motion.button>
  );
}

export default Button;
