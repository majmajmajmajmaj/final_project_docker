
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Paste from '../Paste/Paste';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MyPastes from '../MyPastes/MyPastes';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:link" element={<Paste />} />
          <Route path="/myPastes" element={<MyPastes />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
