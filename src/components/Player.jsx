import React, { useContext, useRef, useState } from "react";
import AudioSection from "./AudioSection";
import UploadSection from "./UploadSection";
import { MusicContext } from "../context/SongContext";
import { getSong } from "../utils/db";

const Player = () => {
  const { musics, audio } = useContext(MusicContext);
  const [selected, setselected] = useState(null);
  const [name, setname] = useState(null);
  const [currentIdx, setcurrentIdx] = useState(null);
  const [shuffle, setshuffle] = useState(false);
  const [repeat, setrepeat] = useState(false);

  const handleSelect = async (music, idx) => {
    setname(music.name);
    if (!music.uploaded) {
      setselected(new URL(music.path, import.meta.url).href);
    } else {
      const songRecord = await getSong(music.id);
      if (songRecord && songRecord.file) {
        const objectURL = URL.createObjectURL(songRecord.file);
        setselected(objectURL);
      }
    }
    setcurrentIdx(idx);
  };

  const handleBack = () => {
    if (!musics || musics.length === 0) return; // Guard clause for empty playlist
    if (audio.current && audio.current.currentTime > 5) {
      // If current song is playing for more than 5 seconds, restart it
      audio.current.currentTime = 0;
    } else {
      let newIndex;
      if (shuffle) {
        const min = 0;
        const max = musics.length - 1;
        newIndex = Math.floor(Math.random() * (max - min + 1)) + min;
      } else if (repeat) {
        newIndex = currentIdx;
        audio.current.currentTime = 0;
      } else {
        newIndex = (currentIdx - 1 + musics.length) % musics.length;
      }
      handleSelect(musics[newIndex], newIndex);
    }
  };

  const handleForward = () => {
    if (!musics || musics.length === 0) return; // Guard clause for empty playlist

    let newIndex;
    if (shuffle) {
      const min = 0;
      const max = musics.length - 1;
      newIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (repeat) {
      newIndex = currentIdx;
      audio.current.currentTime = 0;
      audio.current.play();
    } else {
      newIndex = (currentIdx + 1) % musics.length;
    }
    handleSelect(musics[newIndex], newIndex);
  };

  return (
    <div className="relative z-10 p-5 lg:w-7/8 w-full lg:h-160 h-250 bg-slate-800 rounded-2xl shadow-2xl border-2 border-white flex lg:flex-row flex-col justify-start gap-5 items-center">
      <AudioSection
        handleBack={handleBack}
        handleForward={handleForward}
        name={name}
        selected={selected}
        setshuffle={setshuffle}
        shuffle={shuffle}
        setrepeat={setrepeat}
        repeat={repeat}
      />
      <UploadSection
        setcurrentIdx={setcurrentIdx}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default Player;
