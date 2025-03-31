import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Login from './pages/login/Login.tsx';
import ForgotPassword from './pages/login/ForgotPassword';
import ConfirmPage from './pages/login/ConfirmPage';
import EditPassword from './pages/login/EditPassword';
import NotFoundPage from './pages/not-found/NotFoundPage.tsx';
import HomePage from './pages/homepage/HomePage.tsx';
import FileUpload from './pages/file-upload/fileUpload.tsx';
import ManageBooks from './pages/manage-books/ManageBooks.tsx';
import AdminProfile from './pages/add-admin/ManageAdminDashboard.tsx';
import Preview from './pages/preview/preview.tsx';
import Success from './pages/success/success.tsx';
import BookDetailsPage from './pages/book-details/BookDetailsPage.tsx';
import EditBook from "./pages/edit-book/EditBook.tsx";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* done */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-page" element={<ConfirmPage />} />
        <Route path="/edit-password" element={<EditPassword />} />
        {/* done */}
        <Route path="/main" element={<HomePage />} />
        {/* done */}
        <Route path="/manage-books" element={<ManageBooks />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        {/* done */}
        <Route path="/manage-admins" element={<AdminProfile />} />
        {/* done */}
        <Route path="/add-book" element={<FileUpload />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
