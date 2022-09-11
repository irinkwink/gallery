import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {photoRequestAsync}
  from '../store/photo/photoAction';


export const usePhotoData = (id) => {
  const dispatch = useDispatch();
  const photo = useSelector(state => state.photo.photo);
  const status = useSelector(state => state.photo.status);
  const error = useSelector(state => state.photo.error);

  useEffect(() => {
    dispatch(photoRequestAsync(id));
  }, []);

  return [photo, status, error];
};
