import { useEffect } from 'react';
import Header from './components/Header';
import Player from './components/Player/Player';

function App() {
  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'getToken' }, (response) => {
      const accessToken = response.accessToken;
      console.log('scotttest accessToken', accessToken);
      // Use the access token as needed
    });
  }, []);
  return (
    <div className='App min-h-screen bg-black text-white font-sans flex flex-col justify-between'>
      <div className='lg:w-1/2 lg:p-2'>
        <Header />
      </div>
      <div className='w-full flex justify-center mt-2'>
        <div className='w-full'>
          <Player />
        </div>
      </div>
    </div>
  );
}

export default App;
