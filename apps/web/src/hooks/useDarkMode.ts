import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants';

/**
 * Custom hook for managing dark mode state
 * @returns {[boolean, () => void]} - [isDarkMode, toggleDarkMode]
 */
export const useDarkMode = (): [boolean, () => void] => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return savedMode === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return [isDarkMode, toggleDarkMode];
};

