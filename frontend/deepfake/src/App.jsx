import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './componenets/Homepage';

import About from './componenets/About';
import Detect from './componenets/Detect';
import Contact from './componenets/Contact';
import UseCases from './componenets/UseCases';
import Features from './componenets/Features';

function App() {
  return (
 <>
 
      <Routes>
        <Route path="/" element={<Homepage />} />
       
        <Route path="/About" element={<About/>}/>
        <Route path="/detect" element={<Detect />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/features" element={<Features />} />
      </Routes>
      </>
   
  );
}

export default App;
