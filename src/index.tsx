import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';
import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryBrower } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ManageLibraryPage from './pages/ManageLibraryPage/ManageLibraryPage';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import AllCategories from './pages/ManageLibraryPage/components/AllCategories';
import { history } from './utils/config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryBrower history={history}>
      <Routes>
        <Route path='' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='admin' element={<ManageLibraryPage />}>
            <Route index element={<AllCategories />} />
          </Route>
        </Route>
      </Routes>
    </HistoryBrower>
  </Provider>
);


