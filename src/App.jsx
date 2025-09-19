
import { React } from 'react';

import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Index from './components/Pages/Index';

function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Index />
      </Routes>
    </>
  )
}

export default App;
