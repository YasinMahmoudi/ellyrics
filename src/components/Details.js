import { useEffect } from "react";
import Loader from "./Loader";

const generateSlug = (str = "") =>
  str
    .split(" ")
    .map((str) => str.toLowerCase())
    .join("-");

export default function Details({ selectedSong, isLoading }) {
  const bgImageStyle = {
    background: `linear-gradient(rgba(26, 27, 30, 0.8), rgba(26, 27, 30, 0.8)) , url(https://cdn-images.dzcdn.net/images/cover/${selectedSong?.md5_image}/1000x1000-000000-80-0-0.jpg)`,
  };

  useEffect(
    function () {
      const url = generateSlug(selectedSong?.title);

      window.history.pushState(null, "", url);

      return function () {
        const initialUrl = window.location.href
          .split("/")
          .slice(0, 3)
          .join("/");
        window.history.pushState(null, "", initialUrl);
      };
    },
    [selectedSong]
  );

  return (
    <div
      className="details"
      style={isLoading || !selectedSong ? {} : bgImageStyle}
    >
      {isLoading && <Loader />}

      {!isLoading && !selectedSong && (
        <h1 style={{ fontFamily: "var(--font-2)", color: "#f1f1f1" }}>
          Selecet a song first 😍
        </h1>
      )}

      {!isLoading && selectedSong && (
        <>
          <h1 className="song">
            🎶🎶
            <span> {selectedSong.title} </span>
          </h1>

          <div className="artist">
            <img
              src={selectedSong.artist.picture}
              alt={`Pic of ${selectedSong.artist.name}`}
            />
            <strong className="name">{selectedSong.artist.name} </strong>
          </div>

          <p className="lyric scrollbar">
            <pre>{selectedSong.lyrics}</pre>
          </p>
        </>
      )}
    </div>
  );
}
