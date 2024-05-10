import React from "react";
import { BackwardIcon, ForwardIcon, PlayIcon } from '@heroicons/react/24/outline'
import PlayerProgress from "./PlayerProgress";
import { PlaybackState } from "../../types/types";
import BodyText from "../StyledComponents/BodyText";



type PlayerProps = {
  playbackState: PlaybackState | null
};
const Player: React.FC<PlayerProps> = ({ playbackState }) => {
  const {
    progress_ms: progress = 0,
    item: {
      name = '',
      artists = [],
      album: {
        images = []
      } = {}
    } = {}
  } = playbackState || {};
  const duration = playbackState?.item?.duration_ms ?? 0;
  const progressPct = progress && duration ? (progress / duration) * 100 : 0;
  const smallImage = images?.find(({ height }) => height === 64)
  const artistNames = artists.reduce((accum, { name: artistName },) => (`${accum && `${accum}, `}${artistName}`), '')

  return (
    <div className="grid-cols-12 grid-flow-row-dense grid bg-darker p-3 rounded min-h-[64px]">
      <div className="col-span-3">
        <div className="flex">
          {!!smallImage && <>
            <img className="object-contain mr-2" src={smallImage?.url} alt={`album cover ${name}`} />
            <div>
              <BodyText text={name} />
              <p className="text-xs font-thin">{artistNames}</p>
            </div>
          </>}
        </div>
      </div>
      <div className=" col-span-6 min-h-[64px] flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <div className="flex w-1/2 justify-between">
            <BackwardIcon className="size-8 md:size-6 text-white hover:cursor-pointer" />
            <PlayIcon className="size-8 md:size-6 text-white hover:cursor-pointer" />
            <ForwardIcon className="size-8 md:size-6 text-white hover:cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="w-full">
            <PlayerProgress
              progressPct={progressPct}
              setProgressPct={() => { }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-3">
        {/* Space for volume control etc */}
      </div>
    </div>
  )
}


export default Player