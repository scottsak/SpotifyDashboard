export const SCOPES: string[] = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  // 'streaming',
  'web-playback',
  'user-top-read',
  'user-read-recently-played',
];

export const LAYOUT_SELECTIONS: string[] = ['default', 'album', 'stats'];

export const EDIT_TYPES: { [key: string]: string } = {
  NO_EDIT: '',
  START_PLAYBACK: 'START_PLAYBACK',
  START_SPECIFIC_PLAYBACK: 'START_SPECIFIC_PLAYBACK',
  STOP_PLAYBACK: 'STOP_PLAYBACK',
  SKIP_PLAYBACK: 'SKIP_PLAYBACK',
  REWIND_PLAYBACK: 'REWIND_PLAYBACK',
  SEEK_TO_POSITION: 'SEEK_TO_POSITION',
  UPDATE_VOLUME: 'UPDATE_VOLUME',
};

export const TIME_FRAME_STRINGS = {
  medium_term: 'Past Six Months',
  short_term: 'Past Month',
  long_term: 'Past Year',
};
