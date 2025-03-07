import React from "react";
import ForgotPassword from "./pages/login/ForgotPassword.tsx";
import ConfirmPage from "./pages/login/ConfirmPage.tsx";
import EditPassword from "./pages/login/EditPassword.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Login from "./pages/Login.tsx";
import NotFoundPage from './pages/not-found/NotFoundPage.tsx';
import HomePage from './pages/homepage/HomePage.tsx';
import FileUpload from './pages/file-upload/fileUpload.tsx';
import ManageBooks from './pages/manage-books/ManageBooks.tsx';

const App: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/confirmPage" element={<ConfirmPage />} />
        <Route path="/editPassword" element={<EditPassword />} />
        <Route path="/main" element={<HomePage />} />
        <Route path="/manage-books" element={<ManageBooks />} />
        <Route path="/add-book" element={<FileUpload />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
};


export default App;
