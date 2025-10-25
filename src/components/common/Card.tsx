import { ReactNode } from "react";
import { motion } from "framer-motion";
import { itemVariants } from "./motionVariants";
import "./Card.scss";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "glass" | "solid" | "gradient" | "primary" | "secondary";
  hover?: boolean;
  delay?: number;
  [key: string]: any;
}

function Card({
  children,
  className = "",
  variant = "glass",
  hover = true,
  delay = 0,
  ...props
}: CardProps) {
  const cardClasses = `card card--${variant} ${className}`;

  const motionProps: any = {
    className: cardClasses,
    variants: itemVariants,
    transition: { delay },
    ...props,
  };

  if (hover) {
    motionProps.whileHover = {
      y: -10,
      scale: 1.02,
      transition: { duration: 0.3 },
    };
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}

export default Card;
