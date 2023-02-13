import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ManageLibraryPage from './pages/ManageLibraryPage/ManageLibraryPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='manage' element={<ManageLibraryPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);


