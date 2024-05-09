import Header from './components/Header';
import Player from './components/Player/Player';
import useCurrentlyPlaying from './hooks/useCurrentlyPlaying';
import useToken from './hooks/useToken';

function App() {
  const { token, error: tokenError } = useToken()
  const { currentlyPlaying } = useCurrentlyPlaying()
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
