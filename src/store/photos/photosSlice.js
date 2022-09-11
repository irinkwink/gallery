import {createSlice} from '@reduxjs/toolkit';
import {photosRequestAsync} from './photosAction';

const initialState = {
  photos: [],
  error: '',
  page: 1,
  count: 30,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    photosClear: (state) => {
      state.photos = [];
      state.page = 1;
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: {
    [photosRequestAsync.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [photosRequestAsync.fulfilled]: (state, action) => {
      state.photos = action.payload.photos;
      state.loading = false;
      state.error = '';
      state.page += 1;
    },
    [photosRequestAsync.rejected]: (state, action) => { // ???
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export default photosSlice.reducer;
