import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  rsvpEvent,
  saveEvent,
  promoteEvent,
} from '../../services/eventService';
import { getVenueById } from '../../services/venueService';

const EventCard = ({ event }) => {
  const { profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const includesEvent = (arr) => arr?.some((e) => e._id === event._id);

  const anon = !Object.entries(profile).length;
  const going = !anon && includesEvent(profile.rsvps);
  const saved = !anon && includesEvent(profile.savedEvents);
  const promoted = !anon && includesEvent(profile.promotedEvents);
  const isPromoter = !anon && profile.role === 'PROMOTER';

  const callIfLoggedIn = (func) =>
    anon ? navigate('/login') : func(dispatch, event, profile);

  return (
    <div className="card" style={{ height: '100%' }}>
      {event.image && (
        <img
          src={event.image}
          className="card-img-top"
          alt="..."
          style={{ width: '100%', height: '8rem', objectFit: 'cover' }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1">
          {!isPromoter && (
            <button
              className="float-end btn p-0"
              onClick={() => callIfLoggedIn(saveEvent)}>
              <i className={`${saved ? 'fas' : 'far'} fa-bookmark`}></i>
            </button>
          )}
          <Link to={`/details/${event._id}`}>
            <h6>{event.name}</h6>
          </Link>
        </div>
        <div className="card-text">
          <div>
            {new Date(event.date).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
            })}
            {/* {' · '}
            {event._embedded?.venues[0].city.name},{' '}
            {event._embedded?.venues[0].state.stateCode} */}
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
              } btn-sm mt-2 me-2`}
              onClick={() => callIfLoggedIn(rsvpEvent)}>
              {going ? 'Going' : 'RSVP'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
