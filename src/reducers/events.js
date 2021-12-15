const initialState = {
  allEvents: [],
  promotedEvents: [],
  nearbyEvents: [],
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'get-all-events':
      return {
        ...state,
        allEvents:
          action.response._embedded?.events.map((event) => ({
            _id: event.id,
            name: event.name,
            info: event.info || '',
            date: event.dates.start.localDate,
            time: event.dates.start.localTime,
            venue: event._embedded.venues[0],
            image: event.images[0].url,
          })) || [],
      };
    case 'get-promoted-events':
      return { ...state, promotedEvents: action.events };
    case 'get-nearby-events':
      return {
        ...state,
        nearbyEvents:
          action.response._embedded?.events.map((event) => ({
            _id: event.id,
            name: event.name,
            info: event.info || '',
            date: event.dates.start.localDate,
            time: event.dates.start.localTime,
            venue: event._embedded.venues[0],
            image: event.images[0].url,
          })) || [],
      };
    default:
      return state;
  }
};

export default events;
