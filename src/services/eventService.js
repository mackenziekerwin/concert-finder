import zipcodes from 'zipcodes';
import geohash from 'ngeohash';

import { createUrl } from './utils';

export const getEvents = (dispatch, query) =>
  fetch(
    createUrl('events', {
      classificationName: 'music',
      countryCode: 'US',
      keyword: query,
    })
  )
    .then((response) => response.json())
    .then((response) => dispatch({ type: 'get-all-events', response }));

export const getNearbyEvents = (dispatch, zipCode) => {
  const { latitude, longitude } = zipcodes.lookup(zipCode);
  const geoPoint = geohash.encode(latitude, longitude);

  return fetch(
    createUrl('events', {
      classificationName: 'music',
      countryCode: 'US',
      geoPoint,
    })
  )
    .then((response) => response.json())
    .then((response) => dispatch({ type: 'get-nearby-events', response }));
};

export const getEventById = (id) =>
  fetch(createUrl(`events/${id}`)).then((response) => response.json());

export const getRsvpsByEventId = (id) =>
  fetch(`http://localhost:4000/api/events/${id}/attendees`).then((response) =>
    response.json()
  );

export const rsvpEvent = (dispatch, event, user) =>
  fetch(`http://localhost:4000/api/events/${event._id}/rsvp`, {
    method: 'POST',
    body: JSON.stringify({
      userId: user._id,
      event,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((event) => dispatch({ type: 'rsvp-event', event }));

export const saveEvent = (dispatch, event, user) =>
  fetch(`http://localhost:4000/api/events/${event._id}/save`, {
    method: 'POST',
    body: JSON.stringify({
      userId: user._id,
      event,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((event) => dispatch({ type: 'save-event', event }));

export const promoteEvent = (dispatch, event, user) =>
  fetch(`http://localhost:4000/api/events/${event._id}/promote`, {
    method: 'POST',
    body: JSON.stringify({
      userId: user._id,
      event,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((event) => dispatch({ type: 'promote-event', event }));

export const getPromotedEvents = (dispatch) =>
  fetch(`http://localhost:4000/api/promoted`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((events) => dispatch({ type: 'get-promoted-events', events }));
