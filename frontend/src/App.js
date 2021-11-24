import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import About from './Pages/About'

    const App = () => (
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route exact path="/ommig" element={<About/>}/> 
        </Routes>
      </Router>
    );
    export default App;
