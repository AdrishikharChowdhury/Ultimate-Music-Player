import React from "react";
import { Trash } from "lucide-react";

const Song = ({ onClick, music, onDelete }) => {
  return (
    <div
      className="w-full font-semibold text-center lg:p-6 p-8 cursor-pointer lg:text-xl text-lg text-white flex justify-between items-center bg-slate-950 rounded-2xl shadow-2xl border-2 h-25 active:scale-90 transition-all duration-100"
    >
      <p onClick={onClick} className="truncate grow text-left">
        {music.id}. {music.name}
      </p>
      {music.uploaded && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent the song from being selected when deleting
            onDelete(music.id);
          }}
          className="text-red-500 border-2 rounded-full hover:text-red-700 cursor-pointer ml-2 lg:p-4 p-3"
        >
          <Trash />
        </button>
      )}
    </div>
  );
};

export default Song;
