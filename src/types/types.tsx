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
  context?: SpotifyContext;
  device?: SpotifyDevice;
}

export interface SpotifyDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: string;
  name: string;
  type: string;
  volume_percent: number;
  supports_volume: boolean;
}

export interface SpotifyContext {
  type: string;
  uri: string;
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
