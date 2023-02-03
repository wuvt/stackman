use std::collections::BTreeMap;
use std::f32::consts::PI;
use std::fs::{read_to_string, File};
use std::path::{Path, PathBuf};

use anyhow::Result;
use bytes::{BufMut, BytesMut};
use clap::Parser;
use regex::RegexBuilder;
use rouille::{extension_to_mime, router, Request, Response};
use serde::{Deserialize, Serialize};
use serde_json::from_str;
use tracing::trace;
use uuid::Uuid;

#[derive(Serialize, Debug)]
struct Album {
    uuid: Uuid,
    artist: String,
    title: String,
    genre: String,
    year: u32,
    img: String,
    stack: String,
    label: String,
    tracks: Vec<Uuid>,
    review: String,
    highlights: String,
}

#[derive(Serialize, Debug)]
struct Track {
    uuid: Uuid,
    artist: String,
    title: String,
    album: Uuid,
    length: u32,
    is_fcc: bool,
    audio: String,
}

#[derive(Parser, Debug)]
#[command(version)]
struct Args {
    /// Directory to serve UI from
    #[arg(short, long, default_value = ".")]
    static_dir: PathBuf,

    /// albums.json file to populate database with
    #[arg(short, long, default_value = "albums.json")]
    albums: PathBuf,
}

fn main() -> Result<()> {
    tracing_subscriber::fmt::init();

    let mut args = Args::parse();
    args.static_dir = args
        .static_dir
        .canonicalize()
        .expect("load static assets directory");

    let data = read_to_string(args.albums).expect("load albums.json");
    let (holdings, tracks) = parse_data(&data)?;

    rouille::start_server("0.0.0.0:8000", move |request| {
        router!(request,
            (GET) ["/api/v1/albums.json"] => {
                trace!("GET /api/v1/albums.json");
                Response::from_data("application/json", data.as_str()).with_additional_header("Access-Control-Allow-Origin", "*")
            },

            (GET) ["/api/v1/album/{uuid}", uuid: Uuid] => {
                trace!("GET /api/v1/album/{}", uuid);
                if let Some(album) = holdings.get(&uuid) {
                    Response::json(album).with_additional_header("Access-Control-Allow-Origin", "*")
                } else {
                    trace!("Album not found: {}", uuid);
                    Response::empty_404()
                }
            },

            (GET) ["/api/v1/album/{uuid}/tracks", uuid: Uuid] => {
                trace!("GET /api/v1/album/{}/tracks", uuid);
                if let Some(album) = holdings.get(&uuid) {
                    let album_tracks = album
                        .tracks
                        .iter()
                        .map(|track_id| tracks.get(track_id).unwrap())
                        .collect::<Vec<&Track>>();

                    Response::json(&album_tracks).with_additional_header("Access-Control-Allow-Origin", "*")
                } else {
                    trace!("Album not found: {}", uuid);
                    Response::empty_404()
                }
            },

            (GET) ["/api/v1/albums"] => {
                trace!("GET {}", request.raw_url());
                let mut albums = holdings
                    .values()
                    .filter(|album| {
                        if let Some(stack) = request.get_param("stack") {
                            album.stack == stack
                        } else {
                            true
                        }
                    })
                    .filter(|album| {
                        if let Some(search) = request.get_param("search") {
                            let mut query = String::new();
                            for c in search.chars() {
                                query.push(c);
                                query.push_str(".*");
                            }

                            let re = RegexBuilder::new(&query)
                                .case_insensitive(true)
                                .build()
                                .unwrap();

                            re.is_match(&(album.artist.clone() + &album.title))
                                || re.is_match(&(album.title.clone() + &album.artist))
                        } else {
                            true
                        }
                    })
                    .collect::<Vec<&Album>>();
                albums.sort_by_key(|album| album.artist.clone());

                let start = {
                    if let Some(start) = request.get_param("start") {
                        start.parse::<usize>().unwrap().min(albums.len())
                    } else {
                        0
                    }
                };
                let limit = {
                    if let Some(limit) = request.get_param("limit") {
                        (start + limit.parse::<usize>().unwrap()).min(albums.len())
                    } else {
                        (start + 100).min(albums.len())
                    }
                };

                Response::json(&(&albums[start..limit])).with_additional_header("Access-Control-Allow-Origin", "*")
            },

            (GET) ["/api/v1/albums/new"] => {
                trace!("GET /api/v1/albums/new");
                let new_albums = holdings
                    .values()
                    .filter(|album| album.year == 2022)
                    .map(|album| format!("{}", album.uuid.hyphenated()))
                    .collect::<Vec<String>>();

                Response::json(&new_albums).with_additional_header("Access-Control-Allow-Origin", "*")
            },

            (GET) ["/api/v1/track/{uuid}", uuid: Uuid] => {
                trace!("GET /api/v1/track/{}", uuid);
                if let Some(track) = tracks.get(&uuid) {
                    Response::json(track).with_additional_header("Access-Control-Allow-Origin", "*")
                } else {
                    trace!("Track not found: {}", uuid);
                    Response::empty_404()
                }
            },

            (GET) ["/media/songs/{file}", file: String] => {
                trace!("GET /media/songs/{}", file);
                if let Some(target) = file.strip_suffix(".wav") {
                    trace!("Extracted file name: {}", target);
                    if let Ok(uuid) = Uuid::try_parse(target) {
                        trace!("Parsed uuid: {}", uuid);
                        if let Some(track) = tracks.get(&uuid) {
                            let length = track.length * 44100 * 2;
                            let mut buf = BytesMut::with_capacity((length + 44) as usize);

                            buf.put_u32_le(0x46464952);
                            buf.put_u32_le(length + 36);
                            buf.put_u32_le(0x45564157);
                            buf.put_u32_le(0x20746d66);
                            buf.put_u32_le(0x00000010);
                            buf.put_u32_le(0x00010001);
                            buf.put_u32_le(0x0000ac44);
                            buf.put_u32_le(0x00015888);
                            buf.put_u32_le(0x00100002);
                            buf.put_u32_le(0x61746164);
                            buf.put_u32_le(length);
                            for i in 0..(length / 2) {
                                let wave = (440.0 * 2.0 * PI * (i as f32) / 44100.0).sin() * 30000.0;
                                buf.put_i16_le(wave.floor() as i16);
                            }

                            return Response::from_data("audio/wave", buf).with_additional_header("Access-Control-Allow-Origin", "*");
                        }
                    }
                }

                trace!("Virtual file not found: {}", file);
                Response::empty_404()
            },

            _ => {
                serve_static(request, &args.static_dir)
            }
        )
    });
}

fn serve_static(request: &Request, prefix: &Path) -> Response {
    let mut possible_path = prefix.to_path_buf();
    for component in request.url().split('/') {
        possible_path.push(component);
    }

    if let Ok(mut path) = possible_path.canonicalize() {
        if path.starts_with(prefix) {
            if path.is_dir() {
                path.push("index.html");
            }

            if let Ok(file) = File::open(&path) {
                trace!("GET {}", request.raw_url());

                let extension = path.extension().and_then(|e| e.to_str()).unwrap_or("bin");
                return Response::from_file(extension_to_mime(extension), file);
            }
        }
    }

    trace!("Unknown: GET {}", request.raw_url());
    Response::empty_404()
}

#[derive(Deserialize, Debug)]
struct AlbumRaw {
    uuid: Uuid,
    artist: String,
    title: String,
    genre: String,
    year: u32,
    img: String,
    collection: String,
    label: String,
    tracks: Vec<TrackRaw>,
    review: String,
    highlights: String,
}

#[derive(Deserialize, Debug)]
struct TrackRaw {
    id: u32,
    artist: String,
    title: String,
    length: u32,
    is_fcc: bool,
}

fn parse_data(data: &str) -> Result<(BTreeMap<Uuid, Album>, BTreeMap<Uuid, Track>)> {
    let mut holdings = BTreeMap::new();
    let mut tracks = BTreeMap::new();

    let raw: Vec<AlbumRaw> = from_str(data)?;

    for mut album in raw {
        let mut track_ids = Vec::new();
        album.tracks.sort_by_key(|track| track.id);

        for track in album.tracks {
            let uuid = Uuid::new_v4();

            track_ids.push(uuid);
            tracks.insert(
                uuid,
                Track {
                    uuid,
                    artist: track.artist,
                    title: track.title,
                    album: album.uuid,
                    length: track.length,
                    is_fcc: track.is_fcc,
                    audio: format!("/media/songs/{}.wav", uuid.hyphenated()),
                },
            );
        }

        holdings.insert(
            album.uuid,
            Album {
                uuid: album.uuid,
                artist: album.artist,
                title: album.title,
                genre: album.genre,
                year: album.year,
                img: album.img,
                stack: album.collection,
                label: album.label,
                tracks: track_ids,
                review: album.review,
                highlights: album.highlights,
            },
        );
    }

    Ok((holdings, tracks))
}
