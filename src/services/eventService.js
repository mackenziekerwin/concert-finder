const API_PATH = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = 'smzGmARZARnBVTm760xvhmlvD3sLWDRW';

const createUrl = (route, params = {}) => {
  const paramString = Object.entries(params)
    .map(([key, value]) => (value ? `${key}=${value}&` : ''))
    .join('');
  return `${API_PATH}/${route}.json?${paramString}apikey=${API_KEY}`;
};

export const getEvents = (dispatch, query) =>
  fetch(
    createUrl('events', {
      classificationName: 'music',
      countryCode: 'US',
      keyword: query,
    })
  )
    .then((response) => response.json())
    .then((response) => dispatch({ type: 'get-events', response }));

export const getNearbyEvents = (dispatch, query) => {
  // const showPosition = (position) => {
  //   const latlon = position.coords.latitude + ',' + position.coords.longitude;
  //   console.log(latlon);
  // };
  // const geoHash = navigator.geolocation.getCurrentPosition(
  //   showPosition,
  //   (err) => console.log(err)
  // );
  // fetch(
  //   createUrl('events', {
  //     classificationName: 'music',
  //     countryCode: 'US',
  //     keyword: query,
  //     geoPoint: 'drt2y',
  //     radius: '5',
  //     unit: 'miles',
  //   })
  // )
  //   .then((response) => response.json())
  //   .then((response) => dispatch({ type: 'get-events', response }));
};

export const getEventById = (id) =>
  fetch(createUrl(`events/${id}`)).then((response) => response.json());
