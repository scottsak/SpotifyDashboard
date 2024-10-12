import React from 'react';
import { PlaybackState } from '../../../types/types';

interface AlbumLayout {
  playbackState: PlaybackState | null;
  loadingAfterEditPlayback: string;
}

const AlbumLayout: React.FC<AlbumLayout> = ({ playbackState, loadingAfterEditPlayback }) => {
  const img = (((((playbackState || {}).item || {}).album || {}).images || [])[0] || {}).url || '';
  return (
    <div className='overflow-x-scroll whitespace-nowrap p-4 bg-transparent h-7/8'>
      {!loadingAfterEditPlayback && img ? (
        <img src={img} alt='album' className='h-full mx-auto my-auto' />
      ) : (
        <div className={`rounded bg-dark h-[85svh] aspect-square mx-auto my-auto`} />
      )}
    </div>
  );
};

export default AlbumLayout;
