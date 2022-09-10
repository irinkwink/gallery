import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../../api/const';

export const photoRequestAsync = createAsyncThunk(
  'comments/fetch',
  (id, {rejectWithValue}) => {
    console.log();
    return axios(`${API_URL}/comments/${id}`)
      .then(({data}) => {
        const post = data[0].data.children[0].data;
        const comments = data[1].data.children;
        return {post, comments};
      })
      .catch(error => {
        console.error(error);
        return rejectWithValue(error.message);
      });
  }
);
