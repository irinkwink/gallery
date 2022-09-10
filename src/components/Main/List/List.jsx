import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet} from 'react-router-dom';
import {photosRequestAsync} from '../../../store/photos/photosAction';
// import {photosSlice} from '../../../store/photos/photosSlice';
import Preloader from '../../../UI/Preloader';
import {generateRandomId} from '../../../utils/generateRandomId';
import style from './List.module.css';
import Photo from './Photo';
import {Text} from '../../../UI/Text';


export const List = () => {
  const dispatch = useDispatch();
  // const token = useSelector(state => state.token.token);


  // useEffect(() => {
  //   dispatch(photosSlice.actions.photosClear());
  // });

  const photos = useSelector(state => state.photos.photos);
  console.log('photos: ', photos);
  const loading = useSelector(state => state.photos.loading);
  const page = useSelector(state => state.photos.page);
  console.log('page: ', page);
  const endList = useRef(null);

  const firstLoading = page === 1 ? loading : false;

  const isShowButton = page > 2;

  const handleClick = (e) => {
    e.target.blur();
    dispatch(photosRequestAsync());
  };


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(photosRequestAsync());
        console.log('photosRequestAsync: ');
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
                <Photo key={generateRandomId()} photoData={photo} />)}
            </>
          ) : (
            <div className={style.wrapper}>
              <Text As='p' color='orange' size={22} tsize={26} center>
                Ошибка запроса фотографий.
              </Text>
              <Text As='p' size={20} tsize={24} center>
                Попробуйте перезагрузить страницу.
              </Text>
            </div>
          )
        )}
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
            <li className={style.end} ref={endList}/>
          )
        )}
      </ul>
      <Outlet />
    </>
  );
};
