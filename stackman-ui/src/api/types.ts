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
