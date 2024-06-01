export type Bookmark = {
  id: string;
  title: string;
  parentId?: string;
  index?: number;
  url?: string;
  children?: Array<Bookmark>;
  faviconUrl?: string;
};

export type NullOrUndefined = null | undefined;

export interface PlaybackState {
  is_playing: boolean;
  progress_ms: number;
  item?: SpotifyItem;
}

interface Images {
  height: number;
  width: number;
  url: string;
}

export interface Podcast {
  id: string;
  name: string;
  publisher: string;
  href: string;
  preview_url: string;
  uri: string;
  release_date: string;
  type: string;
  images?: Images[];
}

export interface SpotifyItem {
  id: string;
  name: string;
  album?: SpotifyAlbum;
  artists: SpotifyArtist[];
  duration_ms: number;
  href: string;
  popularity: number;
  preview_url: string;
  uri: string;
  show?: Podcast;
  type: string;
  images?: Images[];
}

export interface SpotifyAlbum {
  name: string;
  album_type: string;
  uri: string;
  images: Images[];
}

export interface SpotifyArtist {
  id: string;
  name: string;
  uri: string;
}
