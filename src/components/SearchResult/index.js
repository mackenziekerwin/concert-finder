import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  rsvpEvent,
  saveEvent,
  promoteEvent,
} from '../../services/eventService';

const SearchResult = ({ event }) => {
  const { profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const includesEvent = (arr) => arr?.some((e) => e._id === event._id);

  const anon = !Object.entries(profile).length;
  const going = !anon && includesEvent(profile.rsvps);
  const saved = !anon && includesEvent(profile.savedEvents);
  const isPromoter = !anon && profile.role === 'PROMOTER';
  const promoted = !anon && isPromoter && includesEvent(profile.promotedEvents);

  const callIfLoggedIn = (func) =>
    anon ? navigate('/login') : func(dispatch, event, profile);

  return (
    <div className="card mt-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={event.image}
            style={{ width: '100%', height: '9rem', objectFit: 'cover' }}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div
            className="card-body d-flex flex-column"
            style={{ height: '100%' }}>
            <div className="flex-grow-1">
              {!isPromoter && (
                <button
                  className="float-end btn p-0"
                  onClick={() => callIfLoggedIn(saveEvent)}>
                  <i className={`${saved ? 'fas' : 'far'} fa-bookmark`}></i>
                </button>
              )}
              <Link to={`/details/${event._id}`}>
                <h5 className="card-title">{event.name}</h5>
              </Link>
            </div>
            <div className="card-text">
              <div>
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                })}
                {' · '}
                {event.venue.city.name}, {event.venue.state.stateCode}
              </div>
              {isPromoter ? (
                <button
                  className={`btn ${
                    promoted ? 'btn-success' : 'btn-outline-primary'
                  } btn-sm mt-2`}
                  onClick={() => promoteEvent(dispatch, event, profile)}>
                  {promoted ? 'Promoted' : 'Promote'}
                </button>
              ) : (
                <button
                  className={`btn ${
                    going ? 'btn-success' : 'btn-outline-primary'
                  } btn-sm mt-2`}
                  onClick={() => callIfLoggedIn(rsvpEvent)}>
                  {going ? 'Going' : 'RSVP'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
