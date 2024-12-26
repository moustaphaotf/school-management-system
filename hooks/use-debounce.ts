import { useEffect, useState } from "react";

export function useDebounce(inputValue: string, delay: number) {
  const [deboundedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(inputValue), delay);
    return () => clearTimeout(timer);
  }, [inputValue, delay]);

  return deboundedValue;
}
