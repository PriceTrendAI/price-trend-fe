import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import SearchPage from '../pages/SearchPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
