import { Upload } from "lucide-react";
import React, { useContext } from "react";
import { MusicContext } from "../context/SongContext";
import { addSong } from "../utils/db";

const UploadSong = () => {
    const { musics, setmusics } = useContext(MusicContext);

    const handleUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        let lastId = musics.length;
        const newSongsForState = [];

        for (const file of files) {
            lastId++;
            const newSong = {
                id: lastId,
                name: file.name,
                file: file,
            };
            await addSong(newSong);
            newSongsForState.push({
                id: lastId,
                name: file.name,
                uploaded: true,
            });
        }

        setmusics((prev) => [...prev, ...newSongsForState]);
    };

    return (
        <div className="absolute text-white text-2xl lg:bottom-1/4 bottom-1/10 right-1/7 translate-x-1/2 translate-y-1/2">
            <label
                className="z-90 w-16 h-16 bg-slate-950 relative cursor-pointer flex items-center justify-center rounded-full border-4 border-gray-400 hover:bg-gray-800 transition-all duration-300"
                htmlFor="music"
            >
                <Upload />
                <input multiple onChange={handleUpload} accept="audio/*" type="file" name="music" id="music" className="hidden" />
            </label>
        </div>
    );
};

export default UploadSong;
