importScripts('https://unpkg.com/tiny-request-router@1.2.2/dist/router.min.js');
importScripts('https://unpkg.com/idb@7.0.2/build/umd-with-async-ittr.js');

const { Router } = self.TinyRequestRouter;
const { deleteDB, openDB } = self.idb;

const openCatalog = () => {
  return openDB('CATALOG', 1, {
    upgrade(db) {
      const holdings = db.createObjectStore('Holding', { keyPath: 'id' });
      const tracks = db.createObjectStore('Track', { keyPath: 'id' });

      holdings.createIndex('year', 'year');
      tracks.createIndex('album', 'album');
    },
  });
};

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const req = await fetch('/albums.json');
    const albums = await req.json();

    await deleteDB('CATALOG');
    const db = await openCatalog();

    let new_tracks = [ ];
    let new_albums = [ ];
    albums.forEach(album => {
      const tracks = album.tracks.map(track => {
        const uuid = crypto.randomUUID();

        new_tracks.push({
          id: uuid,
          artist: track.artist,
          title: track.title,
          album: album.uuid,
          length: track.length,
          is_fcc: track.is_fcc,
          audio: `${location.origin}/media/songs/${uuid}.wav`,
        });

        return uuid;
      });

      new_albums.push({
        id: album.uuid,
        artist: album.artist,
        title: album.title,
        genre: album.genre,
        year: album.year,
        img: album.img,
        stack: album.collection,
        label: album.label,
        tracks: tracks,
        review: album.review,
        highlights: album.highlights,
      });
    });

    const tx1 = db.transaction('Holding', 'readwrite');
    await Promise.all(new_albums.map(album => tx1.store.add(album)));
    await tx1.done;

    const tx2 = db.transaction('Track', 'readwrite');
    await Promise.all(new_tracks.map(track => tx2.store.add(track)));
    await tx2.done;

    db.close();

    return self.skipWaiting();
  })());
});

self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

const responseJSON = data => {
  return new Response(
    JSON.stringify(data),
    { headers: { 'Content-Type' : 'application/json' } },
  );
};

const responseError = (code, data) => {
  return new Response(
    JSON.stringify(data),
    { status: code, headers: { 'Content-Type' : 'application/json' } },
  );
};

const router = new Router();
router
  .get('/api/v1/album/:uuid', async ({ uuid }) => {
    const db = await openCatalog();
    const album = await db.get('Holding', uuid);

    if (album) {
      return responseJSON(album);
    } else {
      return responseError(404, 'album does not exist');
    }
  })
  .get('/api/v1/album/:uuid/tracks', async ({ uuid }) => {
    const db = await openCatalog();
    const album = await db.get('Holding', uuid);

    if (album) {
      let tracks = [ ];
      for (const track_id of album.tracks) {
        const track = await db.get('Track', track_id);

        if (track) {
          tracks.push(track);
        } else {
          return responseError(500, 'track missing in database');
        }
      }

      return responseJSON(tracks);
    } else {
      return responseError(404, 'album does not exist');
    }
    return responseJSON(await db.getFromIndex('Track', 'album', uuid));
  })
  .get('/api/v1/albums', async ({}, params) => {
    const db = await openCatalog();
    const tx = db.transaction('Holding', 'readonly').store.index('year');
    let cursor = await tx.openCursor(undefined, 'prev');

    let start = 0;
    let limit = 100;
    let stack = params.get('stack');
    if (params.get('start') && parseInt(params.get('start'), 10) > 0) {
      start = parseInt(params.get('start'), 10);
    }
    if (params.get('limit') && parseInt(params.get('limit'), 10) > 0) {
      limit = parseInt(params.get('limit'), 10);
    }

    let albums = [ ];
    while (cursor) {
      albums.push(cursor.value);
      cursor = await cursor.continue();
    }

    if (params.get('search')) {
      const filter = new RegExp(
        params.get('search').split('').flatMap(c => [ '.*', c ]).join('') + '.*',
        'i'
      );
      albums = albums.filter(a => {
        return (
          filter.test(`${a.artist} ${a.title}`) ||
          filter.test(`${a.title} ${a.artist}`)
        );
      });
    }
    if (params.get('stack')) {
      albums = albums.filter(a => a.stack === stack);
    }

    return responseJSON(albums.slice(start, start + limit));
  })
  .get('/api/v1/albums/new', async () => {
    return responseJSON([
      '92a80539-cfdd-4a63-947c-ae869a51613a',
      '001462f4-38a7-4a9d-a5cf-3268436cad81'
    ])
  })
  .get('/api/v1/track/:uuid', async ({ uuid }) => {
    const db = await openCatalog();
    const track = await db.get('Track', uuid);

    if (track) {
      return responseJSON(track);
    } else {
      return responseError(404, 'track does not exist');
    }
  })
  .get('/media/songs/:file', async ({ file }) => {
    const match = file.match(/(.*)\.wav/);
    if (!match || match.length !== 2) {
      return responseError(400, 'only wav are supported');
    }

    const db = await openCatalog();
    const track = await db.get('Track', match[1]);
    if (!track) {
      return responseError(404, 'track does not exist');
    }

    const length = track.length * 44100 * 2
    const buffer = new ArrayBuffer(length + 44);
    const view = new DataView(buffer);

    // lol
    view.setUint32(0, 0x46464952, true);
    view.setUint32(4, length + 36, true);
    view.setUint32(8, 0x45564157, true);
    view.setUint32(12, 0x20746d66, true);
    view.setUint32(16, 0x00000010, true);
    view.setUint32(20, 0x00010001, true);
    view.setUint32(24, 0x0000ac44, true);
    view.setUint32(28, 0x00015888, true);
    view.setUint32(32, 0x00100002, true);
    view.setUint32(36, 0x61746164, true);
    view.setUint32(40, length, true);

    for (let i = 0; i < length; i += 2) {
      const wave = Math.sin(440 * Math.PI * i / 44100) * 30000;
      view.setInt16(i + 44, Math.floor(wave), true);
    }

    return new Response(
      buffer, { headers: { 'Content-Type' : 'audio/wave' } },
    );
  });

addEventListener('fetch', e => {
  const { pathname } = new URL(e.request.url);

  const match = router.match(e.request.method, pathname);
  if (match) {
    const searchParams = (new URL(e.request.url)).searchParams;
    e.respondWith((async () => {
      await new Promise(r => setTimeout(r, Math.floor(Math.random() * 400)));
      return await match.handler(match.params, searchParams);
    })());
  }
});
