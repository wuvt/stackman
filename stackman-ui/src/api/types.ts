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

export interface Album {
  uuid: Uuid<Album>;
  artist: string;
  title: string;
  year: number;
  genre: string;
  collection: Collection;
  img: string;
  tracks: Track[];
  label: string;
  review: string;
  highlights: string;
}

export interface Track {
  id: number;
  artist: string;
  title: string;
  length: number;
  is_fcc: boolean;
}
