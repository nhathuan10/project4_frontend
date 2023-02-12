import React from 'react';
import ReactDOM from 'react-dom/client';
// import './App.css'
import Navbar from './assets/components/Navbar';
import './assets/scss/style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Navbar />
  </>
);


