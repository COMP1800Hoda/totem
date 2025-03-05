import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Login from "./pages/login/Login.tsx";
import NotFoundPage from './pages/not-found/NotFoundPage.tsx';
import HomePage from './pages/homepage/HomePage.tsx';
import FileUpload from './pages/file-upload/fileUpload.tsx';
import ManageBooks from './pages/manage-books/ManageBooks.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<HomePage />} />
        <Route path="/manage-books" element={<ManageBooks />} />
        <Route path="/add-book" element={<FileUpload />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
