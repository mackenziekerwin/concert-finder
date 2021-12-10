import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SearchBar = () => {
  const [queryString, setQueryString] = useState('');
  const navigate = useNavigate();
  const { query } = useParams();

  const searchEvents = (q) => {
    navigate(`/search/${q}`);
  };

  useEffect(() => setQueryString(query || ''), [query]);

  return (
    <div className="d-flex">
      <input
        className="form-control me-2"
        placeholder="Search events"
        value={queryString}
        onChange={(e) => setQueryString(e.target.value)}
      />
      <button
        className="btn btn-outline-primary"
        onClick={() => searchEvents(queryString)}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
