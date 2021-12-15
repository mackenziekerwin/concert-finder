const activity = (state = [], action) => {
  switch (action.type) {
    case 'get-posts':
      return action.posts;
    case 'rsvp-event':
      const post = `User RSVP'd to ${action.event.name}`;
      return [post, ...state];
    default:
      return state;
  }
};

export default activity;
