
import './App.css';
// eslint-disable-next-line no-unused-vars
import Header from './components/Header';
// eslint-disable-next-line no-unused-vars
import About from './components/About';
// eslint-disable-next-line no-unused-vars
import Projects from './components/Projects';
// eslint-disable-next-line no-unused-vars
import Contact from './components/Contact';
// eslint-disable-next-line no-unused-vars
import Footer from './components/Footer';

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
