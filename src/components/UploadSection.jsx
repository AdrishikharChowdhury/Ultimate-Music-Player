import React, { useContext } from "react";
import { MusicContext } from "../context/SongContext";
import Song from "./Song";
import UploadSong from "./UploadSong";

const UploadSection = ({ handleSelect }) => {
  const { musics } = useContext(MusicContext);

  return (
        <div className="w-full border-2 border-white shadow-2xl overflow-y-scroll bg-slate-700 h-full rounded-2xl flex flex-col justify-start items-start gap-4 p-5">
      {musics.map((music, idx) => (
        <Song
          key={idx}
          music={music}
          onClick={() => handleSelect(music, idx)}
        />
      ))}
      <UploadSong />
    </div>
  );
};

export default UploadSection;
