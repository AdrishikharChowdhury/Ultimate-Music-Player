import React from "react";

const Song = ({ onClick, music }) => {
  return (
    <div
      onClick={onClick}
      className="w-full grow font-semibold text-center lg:p-6 p-8 cursor-pointer lg:text-xl text-lg text-white flex justify-start items-center bg-slate-950 rounded-2xl shadow-2xl border-2 h-25 active-scale-90 transition-all duration-100"
    >
      <p className="truncate">
        {music.id}. {music.name}
      </p>
    </div>
  );
};

export default Song;
