import { useEffect, useState } from "react";

const useTabFocus = (): boolean => {
  const [isTabFocused, setIsTabFocused] = useState<boolean>(true);

  useEffect(() => {
    const handleVisibilityChange = (): void => {
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