export const apiCall = (url, options, cb) => {
  const {body} = options || {};
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(json => cb && cb(json))
    .catch(error =>
      console.error('Error fetching data:' + url + '--->', error),
    );
};
