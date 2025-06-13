import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import SearchPage from '../pages/searchPage';
import HistoryPage from '../pages/historyPage';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
      <ThemeToggle />
    </BrowserRouter>
  );
}
