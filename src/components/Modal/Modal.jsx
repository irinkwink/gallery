import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import ReactDOM from 'react-dom';
import {useEffect, useRef} from 'react';
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

export const Modal = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const [photo, likes, isLiked, status, error] = usePhotoData(id);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  const handleLikeClick = (addLikes) => {
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

  const handleClick = (e) => {
    if (e.target === overlayRef.current) {
      navigateTo();
    }
  };

  const handleKeyPress = (e) => {
    if (e.code === 'Escape') {
      navigateTo();
    }
  };


  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      {!error && (
        <div className={style.overlay} ref={overlayRef}>
          <div className={style.modal}>
            {status === 'loading' && (
              <Preloader size={100} />)}
            {status === 'loaded' && (
              <div className={style.card}>
                <img
                  className={style.img}
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  width={photo.width}
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
                      size={14}
                      tsize={16}
                      color='black'
                      className={style.linkAuthor}
                      href={photo.user.links.htmlk}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {photo.user.name}
                    </Text>
                  </div>

                  <time className={style.date} dateTime={photo.created_at}>
                    {formatDate(photo.created_at)}
                  </time>
                </div>
              </div>
            )}

            <button
              className={style.close}
              onClick={handleCloseClick}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
    ,
    document.getElementById('modal-root'),
  );
};

