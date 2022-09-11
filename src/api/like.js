import {ACCESS_KEY, API_URL} from './const';

export const updateLike = (id, token, fetchMethod = 'POST') => {
  const searchParams = new URLSearchParams('');
  searchParams.append('client_id', ACCESS_KEY);

  const url = `${API_URL}/photos/${id}/like?${searchParams.toString()}`;

  const options = {
    method: fetchMethod,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error(error);
    });
};
