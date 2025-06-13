import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border bg-white dark:bg-gray-800
      hover:bg-gray-100 dark:hover:bg-gray-700
      dark:border-dark-border fixed bottom-6 right-6 z-50
      transform transition-transform duration-200 ease-in-out hover:scale-110"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-navy-800" />
      )}
    </button>
  );
}
