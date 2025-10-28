import React, { useContext, useEffect, useState } from "react";
import picture1 from "../assets/pic.avif";
import picture2 from "../assets/picture.webp";
import picture3 from "../assets/picture2.jpg";
import picture4 from "../assets/picture3.jpg";
import picture5 from "../assets/picture4.jpg";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat1,
} from "lucide-react";
import { MusicContext } from "../context/SongContext";
import AudioPicture from "./AudioPicture";

const AudioSection = ({
  selected,
  name,
  handleForward,
  handleBack,
  setshuffle,
  shuffle,
  repeat,
  setrepeat
}) => {
  const { audio } = useContext(MusicContext);
  const [isPlaying, setisPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);
  const [percentage, setpercentage] = useState(0);
  const [picture, setpicture] = useState([
    picture1,
    picture2,
    picture3,
    picture4,
    picture5,
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % picture.length);
        setOpacity(1);
      }, 1000); // Match this with transition duration
    }, 15000);

    return () => clearInterval(intervalId);
  }, [picture.length]);

  const handleTime = () => {
    if (audio.current && duration > 0) {
      const newCurrentTime = audio.current.currentTime;
      setcurrentTime(newCurrentTime);
      const newPercentage = (newCurrentTime / duration) * 100;
      setpercentage(newPercentage);
    }
  };

  const handleDuration = (e) => {
    const percent = e.target.value;
    const newTime = (percent / 100) * duration;
    if (isFinite(newTime)) {
      audio.current.currentTime = newTime;
      setpercentage(percent);
    }
  };

  const handlePlay = () => {
    if (!audio.current) return;
    if (isPlaying) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
  };

  const formatDuration = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    setDuration(0);
    if (audio.current) {
      const onLoadedMetadata = () => setDuration(audio.current.duration);
      const onPlay = () => setisPlaying(true);
      const onPause = () => setisPlaying(false);

      audio.current.addEventListener("loadedmetadata", onLoadedMetadata);
      audio.current.addEventListener("play", onPlay);
      audio.current.addEventListener("pause", onPause);

      return () => {
        if (audio.current) {
          audio.current.removeEventListener("loadedmetadata", onLoadedMetadata);
          audio.current.removeEventListener("play", onPlay);
          audio.current.removeEventListener("pause", onPause);
        }
      };
    }
  }, [audio, selected]);

  return (
    <div className="w-2/3 min-w-0 border-2 shadow-2xl border-white bg-slate-700 h-full rounded-2xl flex flex-col justify-start gap-4 items-start p-5">
      <AudioPicture
        selected={selected}
        isPlaying={isPlaying}
        src={picture[currentImageIndex]}
        opacity={opacity}
      />

      {selected && (
        <>
          <div className="bg-slate-900 w-full p-5 text-xl text-white truncate font-semibold text-center rounded-2xl border-2">
            {name}
          </div>
          <audio
            onTimeUpdate={handleTime}
            onEnded={handleForward}
            ref={audio}
            src={selected}
            autoPlay
          ></audio>
          {duration > 0 && (
            <div className="w-full border-2 border-white flex bg-slate-900 rounded-2xl p-5 justify-center items-center gap-5">
              <p className="text-xl text-white font-semibold text-left">
                {formatDuration(currentTime)}
              </p>
              <input
                onChange={(e) => {
                  handleDuration(e);
                }}
                type="range"
                value={percentage}
                id=""
                className="text-white w-full"
              />
              <p className="text-xl text-white font-semibold text-right">
                {formatDuration(duration)}
              </p>
            </div>
          )}
          <div className="w-full flex gap-5 justify-center items-center">
            <button onClick={()=>{
              setrepeat(prev=>!prev)
              setshuffle(false)
            }} className={`text-2xl text-white p-4 cursor-pointer ${repeat ? "bg-slate-700":"bg-slate-900"}  rounded-full border-2 active:scale-90 transition-all duration-100`}>
              <Repeat1 />
            </button>
            <button
              onClick={handleBack}
              className="text-2xl text-white p-4 cursor-pointer bg-slate-900 rounded-full border-2 active:scale-90 transition-all duration-100"
            >
              <SkipBack className="size-10" />
            </button>
            <button
              onClick={handlePlay}
              className="text-2xl text-white p-4 cursor-pointer bg-slate-900 rounded-full border-2 active:scale-90 transition-all duration-100"
            >
              {isPlaying ? (
                <Pause className="size-10" />
              ) : (
                <Play className="size-10" />
              )}
            </button>
            <button
              onClick={handleForward}
              className="text-2xl text-white p-4 cursor-pointer bg-slate-900 rounded-full border-2 active:scale-90 transition-all duration-100"
            >
              <SkipForward className="size-10" />
            </button>
            <button
              onClick={() => {
                setshuffle((prev) => !prev);
                setrepeat(false)
              }}
              className={`text-2xl text-white p-4 cursor-pointer ${shuffle ? "bg-slate-700":"bg-slate-900"}  rounded-full border-2 active:scale-90 transition-all duration-100`}
            >
              <Shuffle />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioSection;
