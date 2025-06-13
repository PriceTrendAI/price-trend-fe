import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const savedTheme = localStorage.getItem('theme');
  const isDark =
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

  document.documentElement.classList.toggle('dark', isDark);

  return {
    isDark,
    toggleTheme: () =>
      set((state) => {
        const newIsDark = !state.isDark;
        const newTheme = newIsDark ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newIsDark);
        localStorage.setItem('theme', newTheme);
        return { isDark: newIsDark };
      }),
  };
});
