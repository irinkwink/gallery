import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ACCESS_KEY, API_URL} from '../../api/const';

export const photoRequestAsync = createAsyncThunk(
  'photo/fetch',
  (id, {getState, rejectWithValue}) => {
    const token = getState().token.token;

    let options = {};

    if (token) {
      options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    const searchParams = new URLSearchParams('');
    searchParams.append('client_id', ACCESS_KEY);

    const url = `${API_URL}/photos/${id}?${searchParams.toString()}`;

    return axios(url, options)
      .then(({data}) => {
        const isLiked = data.liked_by_user;
        const likes = data.likes;
        return {data, likes, isLiked};
      })
      .catch(error => {
        console.error(error);
        return rejectWithValue(error.message);
      });
  }
);
