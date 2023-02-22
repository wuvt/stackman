export type Uuid<T> = string & { __uuid_type: T };

export enum Collection {
  Americana = 'AMC',
  Classical = 'CLS',
  Electronic = 'RPM',
  HipHop = 'HIP',
  Jazz = 'JZZ',
  Metal = 'MTL',
  Ncp = 'NCP',
  NcpJazz = 'NCJ',
  NewAge = 'NGE',
  Novelty = 'NOV',
  Rock = 'RCK',
  SoulFunk = 'SFK',
  Soundtrack = 'SND',
}

export type Album = {
  uuid: Uuid<Album>;
  artist: string;
  title: string;
  year: number;
  genre: string;
  collection: Collection;
  img: string;
};

export type AlbumInfo = Album & {
  tracks: Uuid<Track>[];
  label: string;
  review: string;
  highlights: string;
};

export type Track = {
  uuid: Uuid<Track>;
  disk_number: string;
  artist: string;
  title: string;
  length: number;
  is_fcc: boolean;
};

export type TrackInfo = Track & {
  album: Album;
  audio: string;
};

export const CollectionNames = {
  [Collection.Americana]: 'Americana',
  [Collection.Classical]: 'Classical',
  [Collection.Electronic]: 'Electronic',
  [Collection.HipHop]: 'Hip Hop',
  [Collection.Jazz]: 'Jazz',
  [Collection.Metal]: 'Metal',
  [Collection.Ncp]: 'NCP',
  [Collection.NcpJazz]: 'NCP Jazz',
  [Collection.NewAge]: 'New Age',
  [Collection.Novelty]: 'Novelty',
  [Collection.Rock]: 'Rock/Pop',
  [Collection.SoulFunk]: 'Soul & Funk',
  [Collection.Soundtrack]: 'Soundtracks',
};

// TODO: Pick colors
export const CollectionColors = {
  [Collection.Americana]: '#000000',
  [Collection.Classical]: '#000000',
  [Collection.Electronic]: '#2DD4BF',
  [Collection.HipHop]: '#000000',
  [Collection.Jazz]: '#000000',
  [Collection.Metal]: '#000000',
  [Collection.Ncp]: '#000000',
  [Collection.NcpJazz]: '#000000',
  [Collection.NewAge]: '#000000',
  [Collection.Novelty]: '#000000',
  [Collection.Rock]: '#F87171',
  [Collection.SoulFunk]: '#000000',
  [Collection.Soundtrack]: '#000000',
};
