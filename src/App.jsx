import React from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      {/* Main content area */}
      <main>
        <Home />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;