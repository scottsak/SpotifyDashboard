import React, { useState } from 'react';
import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline';
import PlayerProgress from './PlayerProgress';
import { PlaybackState } from '../../types/types';
import ScrollingText from '../ScrollingText';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';
import SidebarCard from '../SkeletonLoaders/SidebarCardLoader';

type PlayerProps = {
  playbackState: PlaybackState | null;
  editPlayback: EditPlaybackController;
  stateLoadingAfterEdit: boolean;
};

const Player: React.FC<PlayerProps> = ({ playbackState, editPlayback, stateLoadingAfterEdit }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const { progress_ms: progress = 0, is_playing, item } = playbackState || {};
  const {
    name = '',
    artists = [],
    duration_ms: duration = 0,
    album: { images: albumImage = [] } = {},
    images,
    show,
    type,
  } = item || {};
  const {
    stopPlayback = () => {},
    startPlayback = () => {},
    skipPlayback = () => {},
    rewindPlayback = () => {},
    seekToPosition = () => {},
  } = editPlayback;
  const isSong: boolean = type === 'track';
  const progressPct = progress && duration ? (progress / duration) * 100 : 0;
  const imageArr = isSong ? albumImage : images;
  const smallImage = imageArr?.find(({ height }) => height === 64);
  const subSection = isSong
    ? artists?.reduce((accum, { name: artistName }) => `${accum && `${accum}, `}${artistName}`, '')
    : (show || {}).name || '';

  return (
    <div className='grid-cols-12 grid-flow-row-dense grid bg-darker p-3 rounded min-h-[64px]'>
      <div className='col-span-3 pr-2'>
        <div className='w-full'>
          <div className='flex w-full'>
            {!!smallImage && (
              <img
                className='object-contain mr-2'
                src={smallImage.url}
                alt={`album cover ${name}`}
                onLoad={() => setImageLoaded(true)}
              />
            )}
            {/* Show placeholder if image is not loaded */}
            {!imageLoaded && <SidebarCard imgSize={64} />}
            {imageLoaded && (
              <div className='w-full'>
                <ScrollingText text={name} additionalClasses={'text-sm font-sans font-light'} />
                <ScrollingText text={subSection} additionalClasses={'text-xs font-thin'} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='col-span-6 min-h-[64px] flex flex-col justify-center'>
        <div className='flex justify-center w-full'>
          <div className='flex w-1/2 justify-between'>
            <BackwardIcon className='size-8 md:size-6 text-white hover:cursor-pointer' onClick={rewindPlayback} />
            {is_playing ? (
              <PauseIcon className='size-8 md:size-6 text-white hover:cursor-pointer' onClick={stopPlayback} />
            ) : (
              <PlayIcon className='size-8 md:size-6 text-white hover:cursor-pointer' onClick={startPlayback} />
            )}
            <ForwardIcon className='size-8 md:size-6 text-white hover:cursor-pointer' onClick={skipPlayback} />
          </div>
        </div>
        <div className='flex justify-center mt-2'>
          <div className='w-full'>
            <PlayerProgress
              progressPct={progressPct}
              duration={duration}
              progress={progress}
              seekToPosition={seekToPosition}
              stateLoadingAfterEdit={stateLoadingAfterEdit}
            />
          </div>
        </div>
      </div>
      <div className='col-span-3'>{/* Space for volume control etc */}</div>
    </div>
  );
};

export default Player;
