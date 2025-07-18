export default function List({ results, error, onFetchLyric, selectedSong }) {
  return (
    <ul className="list scrollbar">
      {results?.map((res) => (
        <ListItem
          key={res.id}
          item={res}
          onFetchLyric={onFetchLyric}
          selectedSong={selectedSong}
        />
      ))}
    </ul>
  );
}

function ListItem({ item, onFetchLyric, selectedSong }) {
  function handleClick() {
    onFetchLyric(item);
  }

  return (
    <li
      onClick={handleClick}
      className={selectedSong?.id === item.id ? "active" : ""}
    >
      <figure>
        <img
          src={`https://cdn-images.dzcdn.net/images/cover/${item.md5_image}/40x40-000000-80-0-0.jpg`}
          alt={`Img of ${item.title}`}
        />
      </figure>
      <p>
        <span> {item.title} </span>
        &mdash;
        <span> {item.artist.name} </span>
      </p>
    </li>
  );
}
