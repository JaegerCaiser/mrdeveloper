import "./App.scss";
import "./styles/layout.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

const App = () => {
  return (
    <div className="app">
      <main className="main" role="main">
        <Hero />
        <Header />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
