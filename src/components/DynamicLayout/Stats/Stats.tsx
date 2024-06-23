import useRecentlyPlayedTracks from '../../../hooks/spotifyHooks/useRecentlyPlayedTracks';
import { PlaybackState } from '../../../types/types';
import React from 'react';
import Charts from './Charts';
import TopItems from './TopItems';

interface Stats {
  playbackState: PlaybackState | null;
  editPlayback: any;
}

const Stats: React.FC<Stats> = ({ playbackState, editPlayback }) => {
  const { recentlyPlayedStats } = useRecentlyPlayedTracks();
  return (
    <div className='flex flex-col justify-center h-screen'>
      <Charts recentlyPlayedStats={recentlyPlayedStats} playbackState={playbackState} />
      <TopItems editPlayback={editPlayback} />
    </div>
  );
};

export default Stats;
