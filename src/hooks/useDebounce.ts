import { useCallback, useEffect, useState } from "react";

function useDebounce(func: any, delay: any) {
  const [debouncedFunc, setDebouncedFunc] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      func();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [func, delay]);

  return debouncedFunc;
}
