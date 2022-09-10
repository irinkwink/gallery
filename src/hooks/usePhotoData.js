import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {photoRequestAsync}
  from '../store/photo/photoAction';


export const usePhotoData = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photoRequestAsync(id));
  }, []);

  return [];
};
