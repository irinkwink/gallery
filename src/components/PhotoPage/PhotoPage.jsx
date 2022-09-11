import style from './PhotoPage.module.css';
import {useEffect} from 'react';
import {usePhotoData} from '../../hooks/usePhotoData';
import Preloader from '../../UI/Preloader';
import {Text} from '../../UI/Text';
import {useNavigate, useParams} from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import {useDispatch, useSelector} from 'react-redux';
import {photoSlice} from '../../store/photo/photoSlice';
import {updateLike} from '../../api/like';
import {addError, removeError} from '../../store/errorsReducer';
import {DELAY} from '../../api/const';
import {useState} from 'react';

export const PhotoPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [photo, likes, isLiked, status, error] = usePhotoData(id);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const handleLikeClick = () => {
    if (token) {
      const method = isLiked ? 'DELETE' : 'POST';
      updateLike(id, token, method);
      dispatch(photoSlice.actions.changeLikes());
    } else {
      dispatch(addError('Авторизуйтесь, чтобы осталять лайки'));
      setTimeout(() => {
        dispatch(removeError());
      }, DELAY);
    }
  };

  const imageLoaded = () => {
    setLoading(false);
  };

  const navigateTo = () => {
    navigate(`/`);
  };

  useEffect(() => {
    if (error) {
      navigateTo();

      const errorMessage = error.includes('status code 403') ?
        `Исчерпан лимит запросов` :
        `Ошибка загрузки фотографии`;

      dispatch(addError(errorMessage));
      setTimeout(() => {
        dispatch(removeError());
      }, DELAY);
    }
  }, [error]);

  const handleCloseClick = () => {
    navigateTo();
  };

  const handleKeyPress = (e) => {
    if (e.code === 'Escape') {
      navigateTo();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      {!error && (
        <div className={style.container}>
          {(status === 'loading' || loading) && (
            <Preloader size={100} />)}
          {status === 'loaded' && (
            <div className={style.card}
              style={{display: loading ? 'none' : 'flex'}}
            >
              <img
                className={style.img}
                src={photo.urls.full}
                alt={photo.alt_description}
                width={photo.width}
                onLoad={imageLoaded}
              />

              <div className={style.content}>
                <div className={style.wrapper}>
                  <button
                    className={style[isLiked ? 'liked' : 'like']}
                    onClick={() =>
                      handleLikeClick()}
                  >
                    {likes}
                  </button>
                  <Text
                    As='a'
                    size={16}
                    tsize={22}
                    color='black'
                    className={style.linkAuthor}
                    href={photo.user.links.html}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {photo.user.name}
                  </Text>
                </div>

                <time
                  className={style.date}
                  dateTime={photo.created_at}
                >
                  {formatDate(photo.created_at)}
                </time>
              </div>
            </div>
          )}

          <button
            className={style.close}
            onClick={handleCloseClick}
          >
            Назад
          </button>
        </div>
      )}
    </>
  );
};

