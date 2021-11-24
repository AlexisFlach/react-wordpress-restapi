import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';

    const App = () => (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
        </Routes>
      </Router>
    );
    export default App;
