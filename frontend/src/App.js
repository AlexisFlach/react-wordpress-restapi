import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import About from './Pages/About'
import Projects from './Components/Projects'
import ProjectPage from './Components/ProjectPage'

    const App = () => (
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route  path="/ommig" element={<About/>}/>
          <Route  path="/projects" element={<Projects/>}/>
          <Route  path="/projects/:id" element={<ProjectPage/>}/>
        </Routes>
      </Router>
    );
    export default App;
