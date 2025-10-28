import React, { useContext } from "react";
import { MusicContext } from "../context/SongContext";
import Song from "./Song";
import UploadSong from "./UploadSong";
import { deleteSong } from "../utils/db";

const UploadSection = ({ handleSelect }) => {
  const { musics, setmusics } = useContext(MusicContext);

  const handleDelete = async (id) => {
    try {
      await deleteSong(id);
      setmusics(musics.filter((music) => music.id !== id));
    } catch (error) {
      console.error("Failed to delete song:", error);
    }
  };

  return (
    <div className="w-full border-2 border-white shadow-2xl overflow-y-scroll bg-slate-700 h-full rounded-2xl flex flex-col justify-start items-start gap-4 p-5">
      {musics.map((music, idx) => (
        <Song
          key={idx}
          music={music}
          onClick={() => handleSelect(music, idx)}
          onDelete={handleDelete}
        />
      ))}
      <UploadSong />
    </div>
  );
};

export default UploadSection;
