const API_PATH = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = 'smzGmARZARnBVTm760xvhmlvD3sLWDRW';

export const createUrl = (route, params = {}) => {
  const paramString = Object.entries(params)
    .map(([key, value]) => (value ? `${key}=${value}&` : ''))
    .join('');
  return `${API_PATH}/${route}.json?${paramString}apikey=${API_KEY}`;
};
