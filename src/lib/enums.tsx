export const SCOPES: string[] = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'streaming',
  'web-playback',
  'user-top-read',
];

export const LAYOUT_SELECTIONS: string[] = ['default', 'album'];

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
