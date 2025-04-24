import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './componenets/Homepage';
import Signup from './componenets/Sign-up';
import Login from './componenets/Login';
import About from './componenets/About';
import Detect from './componenets/Detect';

function App() {
  return (
 <>
 
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/About" element={<About/>}/>
        <Route path="/detect" element={<Detect />} />

      </Routes>
      </>
   
  );
}

export default App;
