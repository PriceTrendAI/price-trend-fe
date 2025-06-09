import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import SearchPage from '../pages/SearchPage';
import HistoryPage from '../pages/HistoryPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
