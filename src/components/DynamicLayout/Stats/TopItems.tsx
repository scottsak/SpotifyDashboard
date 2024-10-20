import React, { useState } from 'react';
import RowOfCards from '../Row/Row';
import { SpotifyArtist, SpotifyTrack, CardItem } from '../../../types/types';
import useUserTopTracks from '../../../hooks/spotifyHooks/useUserTopTracks';
import useUserTopArtists from '../../../hooks/spotifyHooks/useUserTopArtists';

interface TopItems {
  editPlayback: any;
}

const TopItems: React.FC<TopItems> = ({}) => {
  const { userTopTracks, loading: loadingUserTracks } = useUserTopTracks({});
  const { userTopArtists, loading: loadingUserArtists } = useUserTopArtists();
  const [topTracks, setTopTracks] = useState(false);
  const cardsToShow = topTracks ? userTopTracks : userTopArtists;

  const changeTopItem = (itemType: string) => {
    if (itemType === 'track') {
      setTopTracks(true);
    } else {
      setTopTracks(false);
    }
  };

  const cards: CardItem[] = (cardsToShow || []).map((card: any) => {
    const isTrack = (card: SpotifyTrack | SpotifyArtist): card is SpotifyTrack => topTracks;
    return {
      secondaryText: isTrack(card) ? card.artists?.[0]?.name : 'Artist',
      primaryText: card.name,
      uri: card.uri,
      id: card.id,
      images: isTrack(card) ? card?.album?.images : card?.images,
    };
  });
  const title = 'Your Top Items This Past Month:';
  return (
    <div className='h-1/2 flex justify-center flex-col'>
      <div className='flex justify-between'>
        <h2 className='text-2xl mt-2 flex'>{title}</h2>
        <div className='mt-2 flex'>
          <ul
            className='flex flex-wrap -mb-px text-sm font-medium text-center'
            id='default-tab'
            data-tabs-toggle='#default-tab-content'
            role='tablist'
          >
            <li className='me-2' role='presentation'>
              <button
                className={`inline-block p-2 ${!topTracks ? 'border-b-2 rounded-t-l' : ''}`}
                id='artists-tab'
                data-tabs-target='#artists'
                type='button'
                role='tab'
                onClick={() => changeTopItem('album')}
              >
                artists
              </button>
            </li>
            <li className='me-2' role='presentation'>
              <button
                className={`inline-block p-2 ${topTracks ? 'border-b-2 rounded-t-l' : ''}`}
                id='tracks-tab'
                data-tabs-target='#tracks'
                type='button'
                role='tab'
                onClick={() => changeTopItem('track')}
              >
                tracks
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className='relative flex flex-col'>
        <RowOfCards cards={cards} loadingUserTracks={loadingUserTracks} loadingUserArtists={loadingUserArtists} />
      </div>
    </div>
  );
};

export default TopItems;
