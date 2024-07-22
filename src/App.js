import React from "react";
import { BrowserRouter as Routes, Route } from 'react-router-dom';

import Listing from './components/listing'
import Listings from './components/listings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Listings />} />
      <Route path="/listings/:id" element={<Listing />} />
    </Routes>
  );
}

export default App;
