export const apiCall = (url, options, cb) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  })
    .then(response => response.json())
    .then(json => cb && cb(json))
    .catch(error => console.error('Error fetching data:', error));
};
