import { useEffect } from 'react';
import { getEvents } from '../../services/eventService';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SearchResult from '../SearchResult';

const SearchResults = () => {
  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const { query } = useParams();

  useEffect(() => getEvents(dispatch, query), [dispatch, query]);

  return (
    <div>
      {events.length ? (
        events.map((event) => <SearchResult key={event.id} event={event} />)
      ) : (
        <h6 className="mt-3">
          No results. Try searching for an artist or venue.
        </h6>
      )}
    </div>
  );
};

export default SearchResults;
