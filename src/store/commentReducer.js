const initialState = {
  comment: 'Hi, Redux',
};

const UPDATE_COMMENT = 'UPDATE_COMMENT';

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment,
});

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        comment: action.comment,
      };

    default:
      return state;
  }
};
