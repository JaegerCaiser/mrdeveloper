import "./App.css";
 
import Header from "./components/Header";
 
import About from "./components/About";
 
import Projects from "./components/Projects";
 
import Contact from "./components/Contact";
 
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <Header />
        <About />
        <Projects />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default App;
