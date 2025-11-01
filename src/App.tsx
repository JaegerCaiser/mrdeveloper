import "./App.scss";
import "./styles/layout.scss";

import AnimatedBackground from "./components/AnimatedBackground";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <div className="app">
      <AnimatedBackground />
      <main className="main" role="main">
        <Hero />
        <Header />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};

export default App;
