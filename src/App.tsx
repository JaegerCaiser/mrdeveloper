import React from "react";
import "./App.scss";
import "./styles/layout.scss";

import Header from "./components/Header";
import AnimatedBackground from "./components/AnimatedBackground";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

function App() {
  return (
    <div className="app">
      <AnimatedBackground />
      <main className="main" role="main">
        <Hero />
        <Header />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
