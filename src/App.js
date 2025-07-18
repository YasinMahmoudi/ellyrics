import "./styles.css";

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Search from "../components/Search";
import List from "../components/List";
import Pagination from "../components/Pagination";
import Main from "../components/Main";
import Details from "../components/Details";
import Loader from "../components/Loader";

import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [isLoadingLyric, setIsLoadingLyric] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [error, setError] = useState("");
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  async function handleSearch(query) {
    setSelectedSong(null);

    if (!query) return setResults([]);

    try {
      setError("");
      setIsLoading(true);
      const res = await fetch(`https://api.lyrics.ovh/suggest/${query}`);
      if (!res.ok) throw new Error("problem with fetching data !");

      const data = await res.json();

      if (data.total === 0) throw new Error("⛔ No related data found ! ⛔");

      setResults(data.data);
      setNext(data.next);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePagination(url) {
    try {
      setError("");
      setIsLoading(true);
      const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);

      if (!res.ok) throw new Error("problem with fetching data !");

      const data = await res.json();
      setResults(data.data);
      setNext(data.next);
      setPrev(data.prev);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFetchLyric(data) {
    const {
      id,
      title,
      md5_image,
      duration,
      artist: { name, picture },
    } = data;

    try {
      setIsLoadingLyric(true);
      const res = await fetch(`https://api.lyrics.ovh/v1/${name}/${title}`);

      if (!res.ok) throw new Error("problem with fetching data !");

      const data = await res.json();

      const lyricData = {
        id,
        title,
        md5_image,
        duration,
        artist: { name, picture },
        lyrics: data.lyrics,
      };

      setSelectedSong((selectedSong) =>
        selectedSong?.id !== id ? lyricData : null
      );
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoadingLyric(false);
    }
  }

  return (
    <div className="app">
      <Header numRes={total} onOpenSideBar={setIsOpenSidebar} />

      <SideBar isOpenSidebar={isOpenSidebar} onOpenSideBar={setIsOpenSidebar}>
        <Search query={query} onSetQuery={setQuery} onSearch={handleSearch} />

        {isLoading && <Loader />}

        {!isLoading && !error && results.length > 0 && (
          <>
            <List
              results={results}
              selectedSong={selectedSong}
              onFetchLyric={handleFetchLyric}
            />
            <Pagination next={next} prev={prev} onPaginate={handlePagination} />
          </>
        )}

        {error && <ErrorMessage error={error} />}
      </SideBar>

      <Main>
        <Details selectedSong={selectedSong} isLoading={isLoadingLyric} />
      </Main>
    </div>
  );
}

function ErrorMessage({ error }) {
  return (
    <h1
      style={{
        fontFamily: "var(--font-2)",
        color: "#f1f1f1",
        marginTop: "1rem",
        fontSize: "1.4rem",
      }}
    >
      {error}
    </h1>
  );
}
