import React from "react";

const AudioPicture = ({ src, selected, isPlaying,opacity }) => {
  return (
    <div className="flex justify-center items-center p-5 w-full bg-slate-900 rounded-2xl border-2 border-white grow">
      <img
        src={src}
        style={{ opacity: opacity, transition: "opacity 0.5s ease-in-out" }}
        className={`${
          selected ? "lg:size-60 size-40" : "lg:size-120 md:size-80 sm:size-60 size-50"
        } rounded-full animate-[spin_10s_linear_infinite] ${
          selected
            ? isPlaying
              ? ""
              : "animate-pause grayscale"
            : "grayscale animate-pause"
        }`}
        alt=""
      />
    </div>
  );
};

export default AudioPicture;
