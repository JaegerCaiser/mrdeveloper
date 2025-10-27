import React from "react";
import "./App.scss";
import "./styles/layout.scss";

import Header from "./components/Header";
import AnimatedBackground from "./components/AnimatedBackground";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Writing from "./sections/Writing";
import Contact from "./sections/Contact";

function App() {
  return (
    <div className="app">
      <AnimatedBackground />
      <Header />
      <main className="main" role="main">
        <Hero />
        <About />
        <Experience />
        <Writing />
        <Contact />
      </main>
    </div>
  );
}

export default App;
