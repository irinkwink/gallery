import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet} from 'react-router-dom';
import {DELAY} from '../../../api/const';
import {addError, removeError} from '../../../store/errorsReducer';
import {photosRequestAsync} from '../../../store/photos/photosAction';
import {photosSlice} from '../../../store/photos/photosSlice';
import Preloader from '../../../UI/Preloader';
import {generateRandomId} from '../../../utils/generateRandomId';
import style from './List.module.css';
import Photo from './Photo';


export const List = () => {
  const dispatch = useDispatch();

  const photos = useSelector(state => state.photos.photos);
  const loading = useSelector(state => state.photos.loading);
  const error = useSelector(state => state.photos.error);
  const page = useSelector(state => state.photos.page);
  const endList = useRef(null);

  const firstLoading = page === 1 ? loading : false;

  const token = useSelector(state => state.token.token);

  useEffect(() => {
    dispatch(photosSlice.actions.photosClear());
    dispatch(photosRequestAsync());
  }, [token]);

  useEffect(() => {
    if (error) {
      const errorMessage = error.includes('status code 403') ?
      `Исчерпан лимит запросов` :
      `Ошибка загрузки фотографий`;

      dispatch(addError(errorMessage));
      setTimeout(() => {
        dispatch(removeError());
      }, DELAY);
    }

    dispatch(photosSlice.actions.photosClear());
  }, [error]);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (page !== 1) {
          dispatch(photosRequestAsync());
        }
      }
    }, {
      rootMargin: '50px',
    });

    if (endList.current) {
      observer.observe(endList.current);
    }
    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [page]);

  return (
    <>
      <ul className={style.list}>
        {firstLoading ? (
        <Preloader size={100} />
        ) : (
          photos.length > 0 ? (
            <>
              {photos.map(photo =>
                <Photo
                  key={generateRandomId()}
                  photoData={photo}
                />)}
            </>
          ) : (
            <Preloader size={100} />
          )
        )}
      </ul>
      {!firstLoading && (
        loading && !firstLoading ? (
          <Preloader size={45} />
        ) : (
          <div className={style.end} ref={endList}/>
        )
      )}
      <Outlet />
    </>
  );
};
