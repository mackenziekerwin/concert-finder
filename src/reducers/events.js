const events = (state = [], action) => {
  switch (action.type) {
    case 'get-events':
      return action.response._embedded?.events || [];
    default:
      return state;
  }
};

export default events;
