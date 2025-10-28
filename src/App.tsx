import React from "react";
import "./App.scss";
import "./styles/layout.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Contact from "./sections/Contact";

function App() {
  return (
    <div className="app">
      <main className="main" role="main">
        <Hero />
        <Header />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
