import React from "react";

interface SkillItemProps {
  src: string;
  alt: string;
  name: string;
  className?: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ src, alt, name, className }) => {
  return (
    <div className={`skills__item ${className || ""}`}>
      <img src={src} alt={alt} />
      <div className="skills__item-name">{name}</div>
    </div>
  );
};

export default SkillItem;
