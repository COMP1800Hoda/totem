import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import HomePage from './pages/home/HomePage.tsx';
import NotFoundPage from './pages/notFound/NotFoundPage.tsx';
import { ReadPage } from './pages/read/ReadPage.tsx';
import BooksPage from './pages/book/BooksPage.tsx';
import MyBooksPage from './pages/myBooks/MyBooksPage.tsx';
import ProfilePage from './pages/profile/ProfilePage.tsx';
import AudioPage from './pages/audio/AudioPage.tsx';
import MyAudioPage from './pages/myAudio/MyAudioPage.tsx';
import SearchPage from './pages/search/SearchPage.tsx';
import BookDetailsPage from './pages/bookDetails/BookDetailsPage.tsx';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/read" element={<ReadPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/my-books" element={<MyBooksPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/audio" element={<AudioPage />} />
      <Route path="/my-audio" element={<MyAudioPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />
    </Routes>

  </Router>
);

export default App;
