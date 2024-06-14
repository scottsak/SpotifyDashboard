import { SpotifyArtist, SpotifyItem } from '../types/types';

interface TransformItemOutput {
  name: string;
  duration: number;
  id: string;
  uri: string;
  artists: SpotifyArtist[];
  albumName: string | undefined;
  albumId: string | undefined;
  smallAlbumImage: string | undefined;
  mediumAlbumImage: string | undefined;
  largeAlbumImage: string | undefined;
  albumReleaseDate: string | undefined;
}

export const transformSpotifyItem = (item: SpotifyItem): TransformItemOutput => {
  const { name, duration_ms, id, uri, artists, album } = item || {};
  const { name: albumName, id: albumId, images, releaseDate } = album || {};

  return {
    name,
    duration: duration_ms,
    id,
    uri,
    artists,
    albumName,
    albumId,
    smallAlbumImage: images?.find(({ height }) => height === 64)?.url,
    mediumAlbumImage: images?.find(({ height }) => height === 300)?.url,
    largeAlbumImage: images?.find(({ height }) => height === 640)?.url,
    albumReleaseDate: releaseDate,
  };
};
