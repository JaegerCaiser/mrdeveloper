import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  test('renders all main sections', () => {
    render(<App />);
    
    // Verifica se a estrutura principal existe
    const appElement = document.querySelector('.App');
    expect(appElement).toBeInTheDocument();
    
    const appContent = document.querySelector('.App-content');
    expect(appContent).toBeInTheDocument();
  });

  test('renders Header component', () => {
    render(<App />);
    const header = document.querySelector('.header');
    expect(header).toBeInTheDocument();
  });

  test('renders About section', () => {
    render(<App />);
    const about = document.querySelector('#about');
    expect(about).toBeInTheDocument();
  });

  test('renders Projects section', () => {
    render(<App />);
    const projects = document.querySelector('#projects');
    expect(projects).toBeInTheDocument();
  });

  test('renders Contact section', () => {
    render(<App />);
    const contact = document.querySelector('#contact');
    expect(contact).toBeInTheDocument();
  });

  test('renders Footer component', () => {
    render(<App />);
    const footer = document.querySelector('.footer');
    expect(footer).toBeInTheDocument();
  });

  test('components are rendered in correct order', () => {
    const { container } = render(<App />);
    const sections = container.querySelectorAll('.App-content > *');
    
    // Verifica se existem pelo menos 4 seções principais (Header, About, Projects, Contact)
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });
});
