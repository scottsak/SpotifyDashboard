import React, { useState } from "react";
import { BackwardIcon, ForwardIcon, PlayIcon } from '@heroicons/react/24/outline'
import PlayerProgress from "./PlayerProgress";


type PlayerProps = {};
const Player: React.FC<PlayerProps> = () => {
  // Placeholder for testing. Logic around current player state should be contained in custom hook 
  // once connection to Spotify is established.
  const [progressPct, setProgressPct] = useState<Number>(10)

  return (
    <div className="bg-darker min-w-full p-3 rounded">
      <div className="flex justify-center w-full">
        <div className="flex w-3/4 md:w-1/3 justify-between">
          <BackwardIcon className="size-8 md:size-6 text-white hover:cursor-pointer" />
          <PlayIcon className="size-8 md:size-6 text-white hover:cursor-pointer" />
          <ForwardIcon className="size-8 md:size-6 text-white hover:cursor-pointer" />
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <div className="w-3/4 md:w-2/3">
          <PlayerProgress
            progressPct={progressPct}
            setProgressPct={setProgressPct}
          />
        </div>
      </div>
    </div>
  )
}

export default Player