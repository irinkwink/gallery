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
// import {Text} from '../../../UI/Text';


export const List = () => {
  const dispatch = useDispatch();

  const photos = useSelector(state => state.photos.photos);
  const loading = useSelector(state => state.photos.loading);
  console.log('loading: ', loading);
  const error = useSelector(state => state.photos.error);
  console.log('error: ', error);
  const page = useSelector(state => state.photos.page);
  const endList = useRef(null);

  const firstLoading = page === 1 ? loading : false;
  console.log('firstLoading: ', firstLoading);

  const isShowButton = page > 2;

  useEffect(() => {
    if (page === 1) {
      dispatch(photosSlice.actions.photosClear());
    }
  }, []);

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

  const handleClick = (e) => {
    e.target.blur();
    dispatch(photosRequestAsync());
  };


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!location.search.includes('code')) {
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
  }, []);

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
      {loading && !firstLoading ? (
          <Preloader size={45} />
        ) : (
          isShowButton ? (
            <button
              className={style.btn}
              onClick={handleClick}
            >
              загрузить ещё
            </button>
          ) : (
            <div className={style.end} ref={endList}/>
          )
        )}
      <Outlet />
    </>
  );
};
