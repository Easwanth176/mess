import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/java script/Home';
import Forms from './components/java script/Form';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Forms />} />
          <Route path="/home/:registrationNumber/:personName/:Mess/:hostel" element={<Home />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
