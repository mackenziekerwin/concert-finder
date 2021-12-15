import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Venues = () => {
  const { profile } = useSelector((state) => state);

  const anon = !Object.entries(profile).length;

  return (
    <ul className="list-group">
      <li className="list-group-item fw-bold">Your favorite venues</li>
      {anon ? (
        <li className="list-group-item fst-italic text-muted">
          Log in to search by your favorite venues
        </li>
      ) : profile.favoriteVenues.length ? (
        <>
          {profile.favoriteVenues.map((venue) => (
            <li key={venue._id} className="list-group-item">
              <Link to={`/search/${venue.name}`}>{venue.name}</Link>
            </li>
          ))}
        </>
      ) : (
        <li className="list-group-item fst-italic text-muted">
          Venues will appear here when you add them to your favorites
        </li>
      )}
    </ul>
  );
};

export default Venues;
