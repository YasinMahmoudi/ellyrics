import { LiaSearchSolid } from "react-icons/lia";

export default function Search({ query, onSetQuery, onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter artist or song name"
        value={query}
        onChange={(e) => onSetQuery(e.target.value)}
      />
      <button type="submit">
        <LiaSearchSolid />
      </button>
    </form>
  );
}
