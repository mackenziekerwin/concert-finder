export const register = (user) =>
  fetch(`http://localhost:4000/api/register`, {
    method: 'POST',
    body: JSON.stringify(user),
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
  });

export const login = (user) =>
  fetch(`http://localhost:4000/api/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
  });

export const getProfile = () =>
  fetch(`http://localhost:4000/api/profile`, {
    method: 'POST',
    credentials: 'include',
  }).then((res) => res.json());

export const logout = () =>
  fetch(`http://localhost:4000/api/logout`, {
    method: 'POST',
    credentials: 'include',
  });

export const getUserById = (id) =>
  fetch(`http://localhost:4000/api/users/${id}`, {
    method: 'GET',
  }).then((res) => res.json());

export const getUserRsvps = (id) =>
  fetch(`http://localhost:4000/api/users/${id}/rsvps`, {
    method: 'GET',
  }).then((res) => res.json());

export const getUserPromotions = (id) =>
  fetch(`http://localhost:4000/api/users/${id}/promotions`, {
    method: 'GET',
  }).then((res) => res.json());

export const updateUser = (user) =>
  fetch(`http://localhost:4000/api/users`, {
    method: 'PUT',
    body: JSON.stringify(user),
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
