import styles from './Album.module.css';
import React from "preact/compat";
import example_album from "./example_album.jpg"

const Album = () => {
    const album = {
        title: 'Album Title',
        artist: 'Album Artist',
        year: 'YYYY',
        img: '',
        genre: 'Rock',
        stack: 'RCK',
        review: 'This is a detailed review of the album',
        highlights: '1, 2, 3',
        label: 'Record Label',
        uuid: '1234',
        is_new: true
    };
    const stackColors: {[key: string]: string} = {
        'RCK': 'red',
        'RPM': 'teal',
    };
    return (
        <div class={styles.albumContainer}>
            <div class={styles.stackBox} style={{backgroundColor: (stackColors[album.stack] || 'gray')}}>
            </div>
            <div class={styles.coverBox}>
                <img src={example_album} ></img>
            </div>
            <div class={styles.artistBox}>
                {album.artist}
            </div>
            <div class={styles.nameAndGenreBox}>
                <div class={styles.nameBox}>
                    {album.title}
                </div>
                <div className={styles.genreBox}>
                    {album.genre}
                </div>
            </div>
            <div class={styles.yearBox}>
                {album.year}
            </div>
            <div class={styles.infoBox}>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M11 17h2v-6h-2Zm1-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/>
                </svg>
            </div>
            <div class={styles.dropdownBox}>
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z"/>
                </svg>
            </div>
        </div>
    );
}

export default Album;
