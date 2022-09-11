import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import ReactDOM from 'react-dom';
import {useEffect, useRef} from 'react';
import {usePhotoData} from '../../hooks/usePhotoData';
import Preloader from '../../UI/Preloader';
import {Text} from '../../UI/Text';
import {useNavigate, useParams} from 'react-router-dom';
import formatDate from '../../utils/formatDate';

export const Modal = () => {
  const {id} = useParams();
  console.log('id: ', id);
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const [photo, status, error] = usePhotoData(id);

  const handleLikeClick = () => {
    console.log();
  };

  const navigateTo = () => {
    navigate(`/`);
  };

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
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {status === 'loading' && (
          <Preloader size={100} />)}
        {status === 'error' && (
          <Text As='p' size={18} tsize={24}>
            Ошибка: {error}
          </Text>)}
        {status === 'loaded' && (
          <div className={style.card}>
            <img
              className={style.img}
              src={photo.urls.full}
              alt={photo.alt_description}
            />

            <div className={style.content}>
              <div className={style.wrapper}>
                <button
                  className={style[photo.liked_by_user ? 'liked' : 'like']}
                  onClick={handleLikeClick}
                >
                  {photo.likes}
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
    </div>,
    document.getElementById('modal-root'),
  );
};

