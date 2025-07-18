import { SiMusicbrainz } from "react-icons/si";
import { FiSearch } from "react-icons/fi";

export default function Header({ numRes, onOpenSideBar }) {
  return (
    <header className="header">
      <div className="logo">
        <SiMusicbrainz />
      </div>

      <h2>
        Total results found :<span> {numRes} </span>
      </h2>

      <div className="header-actions">
        <FiSearch className="favorite" onClick={() => onOpenSideBar(true)} />
      </div>
    </header>
  );
}
