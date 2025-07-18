import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function Pagination({ prev, next, onPaginate }) {
  return (
    <div className="pagination">
      {prev && (
        <button onClick={() => onPaginate(prev)}>
          <FaArrowLeftLong />
        </button>
      )}

      {next && (
        <button className="next" onClick={() => onPaginate(next)}>
          <FaArrowRightLong />
        </button>
      )}
    </div>
  );
}
