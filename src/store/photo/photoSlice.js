import {createSlice} from '@reduxjs/toolkit';
import {photoRequestAsync} from './photoAction';

const initialState = {
  loading: false,
  id: '',
  error: '',
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
  },
  extraReducers: {
    [photoRequestAsync.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [photoRequestAsync.fulfilled]: (state, action) => {
      state.post = action.payload.post;
      state.comments = action.payload.comments;
      state.status = 'loaded';
      state.error = '';
    },
    [photoRequestAsync.rejected]: (state, action) => { // ???
      state.status = 'error';
      state.error = action.payload;
    },
  }
});

export default photoSlice.reducer;
