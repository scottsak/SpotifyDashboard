export type Bookmark = {
  id: string;
  title: string;
  parentId?: string;
  index?: number;
  url?: string;
  children?: Array<Bookmark>;
  faviconUrl?: string;
}

export type NullOrUndefined = null | undefined

export interface PlaybackState {
  is_playing: boolean;
  progress_ms: number;
  item?: SpotifyItem;
}

export interface SpotifyItem {
  name: string;
  album: SpotifyAlbum
  artists: SpotifyArtist[];
  duration_ms: number;
  href: string;
  popularity: number;
  preview_url: string;
  id: string;
  uri: string;
}

export interface SpotifyAlbum {
  album_type: string;
  uri: string;
  images: {
    height: number;
    width: number;
    url: string;
  }[];
}

export interface SpotifyArtist {
  name: string;
}