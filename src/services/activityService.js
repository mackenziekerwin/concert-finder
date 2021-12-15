export const getRsvps = () =>
  fetch('https://localhost:4000/api/rsvps').then((res) => res.json());
