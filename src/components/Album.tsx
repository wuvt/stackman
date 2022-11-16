import styles from './Album.module.css';
import React from "preact/compat";
import {useCallback, useRef, useState} from "preact/hooks";
import Track from "./Track";
import useSpring from "../hooks/useSpring";
import classnames from "../utils/classnames";

const DropdownButton = (props: {dropdownOn: boolean, handleDropdown: Function}) => {
    const dButtonRef = useRef<HTMLButtonElement>(null);

    useSpring(props.dropdownOn, 0.6, 700, 28, s => {
        if (dButtonRef.current) {
            dButtonRef.current.style.transform = `rotate(${s.currentValue * -180}deg)`;
        }
    })

    return (
        <button id="dropdown" ref={dButtonRef} onClick={() => props.handleDropdown((prevState: any) => !prevState)} className={styles.dropdownBox}>
            <svg viewBox="0 0 24 24">
                <path fill="black" d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z"/>
            </svg>
        </button>
    );
}

const Album = (props: { album: any, cUUID: string, playingUUID: string, cID: number, handleInfo: Function, handlePlay: Function; }) => {
    const stackColors: {[key: string]: string} = {
        'RCK': '#F87171',
        'RPM': '#2DD4BF',
    };


    const [ dropdownOn, setDropdownOn ] = useState(false);

    return (
        <div>
        <div class={styles.albumContainer}>
            <div class={styles.stackBox} style={{backgroundColor: (stackColors[props.album.collection] || 'gray')}}>
            </div>
            <div class={styles.coverBox}>
                <img src={props.album.img} ></img>
            </div>
            <div class={styles.artistBox}>
                {props.album.artist}
            </div>
            <div class={styles.nameAndGenreBox}>
                <div class={styles.nameBox}>
                    {props.album.title}
                </div>
                {props.album.year===2022 && <div class={styles.newBox}>New!</div>}
                <div className={styles.genreBox}>
                    {props.album.genre}
                </div>
            </div>
            <div class={styles.yearBox}>
                {props.album.year}
            </div>
            <button id="info" onClick={() => props.handleInfo(props.album.uuid)} class={props.album.uuid===props.cUUID ? styles.infoBoxOn: styles.infoBoxOff}>
                <svg class={styles.infoSVG} viewBox="0 0 24 24">
                    <path fill={props.album.uuid===props.cUUID  ? "white": "black"}
                          d="M11 17h2v-6h-2Zm1-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/>
                </svg>
            </button>
            <DropdownButton dropdownOn={dropdownOn} handleDropdown={setDropdownOn}></DropdownButton>
        </div>
        {dropdownOn && <div class={styles.tracksBox}>
            {props.album.tracks.map((track: any, index: number) => {
                    return <Track album={props.album} track={track} index={index} handlePlay={props.handlePlay} playingUUID={props.playingUUID} cID={props.cID}></Track>
                }
            )}
        </div>
        }
        </div>
    );
}

export default Album;
