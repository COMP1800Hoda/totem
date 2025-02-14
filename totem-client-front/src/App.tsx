import { BrowserRouter as Router, Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import HomePage from './pages/home/HomePage.tsx';
import NotFoundPage from './pages/notFound/NotFoundPage.tsx';
import ReadPage from './pages/read/ReadPage.tsx';


const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/read" element={<ReadPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
