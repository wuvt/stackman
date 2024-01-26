import { useEffect, useState } from 'preact/hooks';

import { Album, AlbumInfo, Collection, Track, TrackInfo, Uuid } from './types';

type QueryResult<T> =
  | { data: undefined; error: undefined; isLoading: true }
  | { data: undefined; error: string; isLoading: false }
  | { data: T; error: undefined; isLoading: false };

const useQuery = <T>(query?: string): QueryResult<T> => {
  const [result, setResult] = useState<QueryResult<T>>({
    data: undefined,
    error: undefined,
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    if (query) {
      fetch(`http://localhost:8000/api/${query}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data: T) =>
          setResult({ data, error: undefined, isLoading: false }),
        )
        .catch((error) =>
          setResult({ data: undefined, error, isLoading: false }),
        );
    }

    setResult({ data: undefined, error: undefined, isLoading: true });
    return () => controller.abort();
  }, [query]);

  return result;
};

export const useAlbum = (id?: Uuid<Album>) => {
  return useQuery<AlbumInfo>(id ? `v1/albums/${id}` : undefined);
};

export const useAlbumTracks = (id?: Uuid<Album>) => {
  return useQuery<Track[]>(id ? `v1/albums/${id}/tracks` : undefined);
};

export const useTrack = (id?: Uuid<Track>) => {
  return useQuery<TrackInfo>(id ? `v1/tracks/${id}` : undefined);
};

export type UseAlbumProps = {
  collection?: Collection;
  showNew?: boolean;
  search?: string;
};

export const useAlbums = (props?: UseAlbumProps) => {
  let params = new URLSearchParams();
  if (props?.collection) {
    params.append('collection', props.collection);
  }
  if (props?.showNew) {
    params.append('new', 'true');
  }
  if (props?.search) {
    params.append('search', props.search);
  }
  return useQuery<Album[]>(`v1/albums?${params.toString()}`);
};

export * from './types';
