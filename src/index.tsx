import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';
import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryBrower } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import AllCategories from './pages/ManageLibraryPage/components/AllCategories';
import { history } from './utils/config';
import ManageCategoryPage from './pages/ManageLibraryPage/ManageCategoryPage';
import AllBooksPage from './pages/ManageLibraryPage/AllBooksPage';
import AddBookPage from './pages/ManageLibraryPage/AddBookPage';
import SearchBooksPage from './pages/SearchBooksPage/SearchBooksPage';
import BookCheckoutPage from './pages/BookCheckoutPage/BookCheckoutPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryBrower history={history}>
      <Routes>
        <Route path='' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='search-books' element={<SearchBooksPage />} />
          <Route path='checkout/:id' element={<BookCheckoutPage />}/>
          <Route path='admin/category' element={<ManageCategoryPage />}>
            <Route index element={<AllCategories />} />
            <Route path=':id' element={<AllCategories />} />
          </Route>
          <Route path='admin/book'>
            <Route index element={<AllBooksPage />} />
            <Route path='add-book' element={<AddBookPage />} />
            <Route path='update/:id' element={<AddBookPage />} />
          </Route>
        </Route>
      </Routes>
    </HistoryBrower>
  </Provider>
);


