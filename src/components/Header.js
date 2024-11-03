import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import profileImage from '../assets/profile.png'; // Certifique-se de que a imagem está na pasta correta

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header--hidden' : ''}`}>
      <img src={profileImage} alt="Matheus Henrique Caiser" className="header__image" />
      <h1 className="header__title">Matheus Henrique Caiser</h1>
      
    </header>
  );
}

export default Header;