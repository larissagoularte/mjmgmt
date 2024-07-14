import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from "./components/Header";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Header /> 
        <Routes>
          <Route path="/registar" element={<Register />} />


        </Routes>

      </Router>
    </div>
  );
}

export default App;
