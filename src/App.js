import Products from "./components/Products";
import {ProductsCreate } from "./components/ProductsCreate"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Products/>}></Route>
      <Route path="/create" element={<ProductsCreate/>}></Route>
    </Routes>
  </BrowserRouter>
}

export default App;