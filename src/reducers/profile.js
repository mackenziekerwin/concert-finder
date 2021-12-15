const profile = (state = {}, action) => {
  switch (action.type) {
    case 'get-profile':
      return { ...state, ...action.user };
    case 'save-event':
      let savedEvents;
      if (state.savedEvents?.some((event) => event._id === action.event._id)) {
        savedEvents = state.savedEvents.filter(
          (event) => event._id !== action.event._id
        );
      } else {
        savedEvents = [...state.savedEvents, action.event];
      }
      return { ...state, savedEvents };
    case 'rsvp-event':
      let rsvps;
      if (state.rsvps?.some((event) => event._id === action.event._id)) {
        rsvps = state.rsvps.filter((event) => event._id !== action.event._id);
      } else {
        rsvps = [...state.rsvps, action.event];
      }
      return { ...state, rsvps };
    case 'promote-event':
      let promotedEvents;
      if (
        state.promotedEvents?.some((event) => event._id === action.event._id)
      ) {
        promotedEvents = state.promotedEvents.filter(
          (event) => event._id !== action.event._id
        );
      } else {
        promotedEvents = [...state.promotedEvents, action.event];
      }
      return { ...state, promotedEvents };
    case 'favorite-venue':
      let favoriteVenues;
      if (action.venue.venueId) {
        favoriteVenues = state.favoriteVenues.filter(
          (venue) => venue._id !== action.venue.venueId
        );
      } else {
        favoriteVenues = [...state.favoriteVenues, action.venue];
      }
      return { ...state, favoriteVenues };
    case 'logout':
      return {};
    default:
      return state;
  }
};

export default profile;
