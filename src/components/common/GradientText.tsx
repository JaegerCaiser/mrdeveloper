import { ElementType, ReactNode } from "react";
import "./GradientText.scss";

interface GradientTextProps {
  children: ReactNode;
  gradient?: "primary" | "secondary" | "accent" | "rainbow" | "warm" | "cool";
  className?: string;
  as?: ElementType;
  [key: string]: any;
}

function GradientText({
  children,
  gradient = "primary",
  className = "",
  as: Component = "span",
  ...props
}: GradientTextProps) {
  const classes = `gradient-text gradient-text--${gradient} ${className}`;

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default GradientText;
