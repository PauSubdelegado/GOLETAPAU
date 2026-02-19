import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
