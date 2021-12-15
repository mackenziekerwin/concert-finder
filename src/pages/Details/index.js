import { useEffect, useState } from 'react';
import {
  getEventById,
  getRsvpsByEventId,
  saveEvent,
  rsvpEvent,
  promoteEvent,
} from '../../services/eventService';
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import VenueCard from '../../components/VenueCard';

const Details = () => {
  const {
    profile,
    events: { promotedEvents },
  } = useSelector((state) => state);
  const [event, setEvent] = useState({});
  const [rsvps, setRsvps] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => getEventById(id).then((event) => setEvent(event)), [id]);

  const includesEvent = (arr) => arr?.some((e) => e._id === event.id);

  const anon = !Object.entries(profile).length;
  const going = !anon && includesEvent(profile.rsvps);
  const saved = !anon && includesEvent(profile.savedEvents);
  const isPromoter = !anon && profile.role === 'PROMOTER';
  const promotedByUser =
    !anon && isPromoter && includesEvent(profile.promotedEvents);
  const promotedByAnyone = includesEvent(promotedEvents);

  useEffect(
    () => getRsvpsByEventId(id).then((rsvps) => setRsvps(rsvps)),
    [id, going]
  );

  const callIfLoggedIn = (func) =>
    anon
      ? navigate('/login')
      : func(dispatch, { ...event, _id: event.id }, profile);

  if (!event.id) return null;

  return (
    <div>
      <div className="row g-5 mb-3 align-items-end">
        <div className="col-md-3">
          {event.images && (
            <img
              src={event.images[0]?.url}
              alt={event.name}
              className="w-100 rounded"
            />
          )}
        </div>
        <div className="col-md-9">
          <h1>{event.name}</h1>
          <div className="text-muted">
            {isPromoter ? (
              <button
                className={`btn ${
                  promotedByUser ? 'btn-success' : 'btn-outline-primary'
                } btn-sm`}
                onClick={() => callIfLoggedIn(promoteEvent)}>
                {promotedByUser ? 'Promoted' : 'Promote'}
              </button>
            ) : (
              <>
                {rsvps.length} {rsvps.length === 1 ? 'person is' : 'people are'}{' '}
                going
                <button
                  className={`btn ${
                    going ? 'btn-success' : 'btn-outline-primary'
                  } btn-sm ms-2`}
                  onClick={() => callIfLoggedIn(rsvpEvent)}>
                  {going ? 'Going' : 'RSVP'}
                </button>
                <button
                  className="btn p-0 ms-3"
                  onClick={() => callIfLoggedIn(saveEvent)}>
                  <i className={`${saved ? 'fas' : 'far'} fa-bookmark`}></i>
                </button>
                {promotedByAnyone && (
                  <span className="badge bg-primary ms-2">Promoted</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row g-5">
        <div className="col-md-3">
          <div>
            {new Date(event.dates.start.dateTime).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            })}
          </div>
          <div>
            {new Date(event.dates.start.dateTime).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
          <a
            className="btn btn-primary mt-3"
            href={event.url}
            target="_blank"
            rel="noreferrer">
            Get Tickets <i className="fas fa-external-link-alt ms-1" />
          </a>
        </div>
        <div className="col-md-9">
          {event.info}
          <h3 className="mt-3">Venue Information</h3>
          <div className="row">
            {event._embedded?.venues.map((venue) => (
              <div className="col-md-4" key={venue.id}>
                <VenueCard
                  id={venue.id}
                  name={venue.name}
                  city={venue.city.name}
                  state={venue.state.stateCode}
                />
              </div>
            ))}
          </div>
          {!!rsvps.length && (
            <>
              <h3 className="mt-3">Attendees</h3>
              {rsvps.map((rsvp) => (
                <Link to={`/profile/${rsvp._id}`}>
                  {rsvp.firstName} {rsvp.lastName}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
