import {createSlice} from '@reduxjs/toolkit';
import {photoRequestAsync} from './photoAction';

const initialState = {
  status: '',
  photo: {},
  likes: 0,
  isLiked: false,
  error: '',
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    changeLikes: (state) => {
      state.likes += state.isLiked ? -1 : 1;
      state.isLiked = !state.isLiked;
    },
  },
  extraReducers: {
    [photoRequestAsync.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [photoRequestAsync.fulfilled]: (state, action) => {
      state.photo = action.payload.data;
      state.isLiked = action.payload.isLiked;
      state.likes = action.payload.likes;
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
