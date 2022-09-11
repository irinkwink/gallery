import {useDispatch} from 'react-redux';
import {updateToken} from '../store/tokenReducer';
import {
  ACCESS_KEY,
  API_URL_TOKEN,
  REDIRECT_URI,
  SECRET_KEY,
} from './const';

export const setToken = (token) => {
  localStorage.setItem('bearer', token);
};

export const getTokenUrl = (code) => {
  const searchParams = new URLSearchParams('');

  searchParams.append('client_id', ACCESS_KEY);
  searchParams.append('client_secret', SECRET_KEY);
  searchParams.append('redirect_uri', REDIRECT_URI);
  searchParams.append('code', code);
  searchParams.append('grant_type', 'authorization_code');

  return `${API_URL_TOKEN}?${searchParams.toString()}`;
};

export const getToken = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('bearer');
  if (token) {
    dispatch(updateToken(token));
  }

  if (location.search.includes('code')) {
    const code = new URLSearchParams(location.search)
      .get('code');
    const url = getTokenUrl(code);

    fetch(url, {method: 'POST'})
      .then(response => response.json())
      .then(data => data.access_token)
      .then(token => {
        setToken(token);
        dispatch(updateToken(token));
        location.replace('/');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return;
};
