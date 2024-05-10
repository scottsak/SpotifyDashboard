import Header from './components/Header';
import Player from './components/Player/Player';
import usePlaybackState from './hooks/spotifyHooks/usePlaybackState';

function App() {
  const { playbackState } = usePlaybackState()
  return (
    <div className='App min-h-screen bg-black text-white font-sans flex flex-col justify-between'>
      <div className='lg:w-1/2 lg:p-2'>
        <Header />
      </div>
      <div className='w-full flex justify-center mt-2'>
        <div className='w-full'>
          <Player playbackState={playbackState} />
        </div>
      </div>
    </div>
  );
}

export default App;
