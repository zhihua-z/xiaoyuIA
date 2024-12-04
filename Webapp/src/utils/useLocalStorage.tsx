import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  // Get the stored value or use the initial value if none exists
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", error);
      return initialValue;
    }
  });

  // Update localStorage whenever the value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage key:", error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;