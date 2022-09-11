import {setToken} from '../api/token';

const initialState = {
  token: '',
  error: '',
};

const UPDATE_TOKEN = 'UPDATE_TOKEN';
const DELETE_TOKEN = 'DELETE_TOKEN';

export const updateToken = token => ({
  type: UPDATE_TOKEN,
  token,
});

export const deleteToken = (error = '') => ({
  type: DELETE_TOKEN,
  token: '',
  error,
});

export const tokenMiddleware = store => next => (action) => {
  if (action.type === UPDATE_TOKEN) {
    setToken(action.token);
  }

  if (action.type === DELETE_TOKEN) {
    setToken('');
  }

  next(action);
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      setToken(action.token);
      return {
        ...state,
        token: action.token,
        error: '',
      };

    case DELETE_TOKEN:
      setToken('');
      return {
        ...state,
        token: '',
        error: action.error,
      };

    default:
      return state;
  }
};
