import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { favoriteVenue } from '../../services/venueService';

const VenueCard = ({ id, name, city, state }) => {
  const { profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const anon = !Object.entries(profile);
  const isFavorite =
    !anon && profile.favoriteVenues?.some((venue) => venue._id === id);

  const favorite = (venueId) =>
    anon ? navigate('/login') : favoriteVenue(dispatch, venueId, profile);

  return (
    <div className="card">
      <div className="card-body">
        <div>
          <button className="float-end btn p-0" onClick={() => favorite(id)}>
            <i
              className={`${
                isFavorite ? 'fas text-warning' : 'far'
              } fa-star`}></i>
          </button>
          <h5 className="card-title">{name}</h5>
        </div>
        <div className="card-text">
          {city}, {state}
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
