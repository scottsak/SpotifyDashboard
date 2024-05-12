import { useEffect, useState } from "react"

const useToken = (): { token: string, error: string } => {
  const [token, setToken] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    let isMounted = true;
    try {
      chrome.runtime.sendMessage({ type: 'getToken' }, (response) => {
        if (!isMounted) {
          return;
        }
        if (response?.accessToken) {
          setToken(response.accessToken);
        } else if (response?.error) {
          setError(response.error);
        } else {
          setError("Unknown error occurred while fetching token");
        }
      });
    } catch (error) {
      let message = 'Unknown Error'
      if (error instanceof Error) {
        message = error.message
      }
      if (isMounted) {
        setError(message)
      }
    }

    return () => {
      isMounted = false;
    }
  }, []);
  return { token, error }
}

export default useToken