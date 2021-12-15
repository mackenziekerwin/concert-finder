import { createUrl } from './utils';

export const getVenueById = (id) =>
  fetch(createUrl('venues', { id })).then((response) => response.json());

export const favoriteVenue = (dispatch, venueId, user) =>
  fetch(`http://localhost:4000/api/venues/${venueId}/favorite`, {
    method: 'POST',
    body: JSON.stringify({
      userId: user._id,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((venue) => dispatch({ type: 'favorite-venue', venue }));
