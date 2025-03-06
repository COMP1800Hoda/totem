import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminHomePage from './Adminhome.tsx';
import FileUpload from './fileUpload.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Links */}
        {/* <nav>
          <Link to="/" className="nav-link">Admin Home</Link>
          <Link to="/file-upload" className="nav-link">File Upload</Link>
        </nav> */}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="/file-upload" element={<FileUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;