import React, { createContext, useEffect, useRef, useState } from "react";
import songs from "../data/musics.json";
import { getAllSongs } from "../utils/db";

export const MusicContext = createContext(null);

const SongContext = ({ children }) => {
  const [musics, setmusics] = useState([]);
  const audio = useRef(null);

  useEffect(() => {
    const loadSongs = async () => {
      const dbSongs = await getAllSongs();
      const uploadedSongs = dbSongs.map(song => ({
          id: song.id,
          name: song.name,
          uploaded: true,
      }));
      setmusics([...songs, ...uploadedSongs]);
    };

    loadSongs();
  }, []);

  return (
    <MusicContext.Provider value={{ musics, setmusics, audio }}>
      {children}
    </MusicContext.Provider>
  );
};

export default SongContext;
