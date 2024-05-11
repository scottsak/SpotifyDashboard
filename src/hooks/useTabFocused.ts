import { useEffect, useState } from "react";

const useTabFocus = (): boolean => {
  const [isTabFocused, setIsTabFocused] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabFocused(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isTabFocused;
};

export default useTabFocus;