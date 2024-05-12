import Header from './components/Header';
import Player from './components/Player/Player';
import usePlaybackState from './hooks/spotifyHooks/usePlaybackState';
import Body from './components/Body';

function App() {
  const { playbackState } = usePlaybackState();
  return (
    <div className='App bg-black text-white font-sans flex flex-col justify-between h-screen'>
      {/* <div className='lg:w-1/2 lg:p-2'>
        <Header />
      </div> */}
      <div className='lg:p-2 h-6/7 h-screen overflow-hidden'>
        <Body />
      </div>
      <div className='w-full flex justify-center mt-2 h-1/7'>
        <div className='w-full'>
          <Player playbackState={playbackState} />
        </div>
      </div>
    </div>
  );
}

export default App;
