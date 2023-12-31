import { useEffect, useState } from 'react';

type UseLocalStorageOutput<T> = [T | undefined, (value: T) => void];

const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): UseLocalStorageOutput<T> => {
  const [storedValue, setStoredValue] = useState<T | undefined>();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const item = window.localStorage.getItem(key);
    if (item) setStoredValue(JSON.parse(item));
    else setStoredValue(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = (value: T) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
