import React from "react";

const Song = ({ onClick, music }) => {
  return (
    <div
      onClick={onClick}
      className="p-6 cursor-pointer text-xl text-white flex justify-start items-center bg-slate-950 rounded-2xl shadow-2xl border-2 active:scale-90 transition-all duration-100"
    >
      {music.id}. {music.name}
    </div>
  );
};

export default Song;
