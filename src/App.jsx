
import { React } from 'react';

import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Index from './components/Pages/Index';
import ProductDetails from './components/Pages/ProductDetails';

function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/product/:id' element={<ProductDetails />} />
      </Routes>
    </>
  )
}

export default App;
