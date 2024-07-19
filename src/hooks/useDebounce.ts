import { useCallback, useEffect, useState } from "react";

export function useDebounce(value: any, delay: any) {
  const [debouncedFunc, setDebouncedFunc] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFunc(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedFunc;
}
