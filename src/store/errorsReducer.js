const initialState = {
  errors: [],
};

const ADD_ERROR = 'ADD_ERROR';
const REMOVE_ERROR = 'REMOVE_ERROR';

export const addError = error => ({
  type: ADD_ERROR,
  error,
});

export const removeError = () => ({
  type: REMOVE_ERROR,
});

export const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.error],
      };
    case REMOVE_ERROR:
      return {
        ...state,
        errors: state.errors.slice(1),
      };

    default:
      return state;
  }
};
