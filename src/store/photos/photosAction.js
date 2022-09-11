import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ACCESS_KEY, API_URL} from '../../api/const';

export const photosRequestAsync = createAsyncThunk(
  'photos/fetch',
  (_, {getState, rejectWithValue}) => {
    const token = getState().token.token;
    const {photos, page, count} = getState().photos;

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
    if (page && count) {
      searchParams.append('per_page', count);
      searchParams.append('page', page);
    }

    const url = `${API_URL}/photos?${searchParams.toString()}`;

    return axios(url, options)
      .then(({data}) => {
        let newPhotos = data;
        if (page > 1) {
          newPhotos = [...photos, ...newPhotos];
        }
        return ({
          photos: newPhotos,
        });
      })
      .catch(error => {
        console.error(error);
        return rejectWithValue(error.message);
      });
  }
);

