import Player from './components/Player/Player';
import usePlaybackState from './hooks/spotifyHooks/usePlaybackState';
import Body from './components/Body';
import Alert from './components/Alert';
import useWebPlayback from './hooks/spotifyHooks/useWebPlayback';

function App() {
  const { playbackState, displayError, needsTokenRefresh, editPlayback } =
    usePlaybackState();
  const { player: webPlayback } = useWebPlayback();
  return (
    <div className='App bg-black text-white font-sans flex flex-col justify-between h-screen'>
      {displayError && (
        <Alert
          message={
            needsTokenRefresh
              ? 'Your token has expired'
              : 'Welcome to Spotify Dashboard'
          }
          promptLogin={true}
        />
      )}
      <div className=' h-6/7 h-screen overflow-hidden'>
        <Body playbackState={playbackState} editPlayback={editPlayback} />
      </div>
      <div className='w-full flex justify-center h-1/7 border border-[#1b1b1b]'>
        <div className='w-full'>
          <Player
            playbackState={playbackState}
            webPlayback={webPlayback}
            editPlayback={editPlayback}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
