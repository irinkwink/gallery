import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import ReactDOM from 'react-dom';
import {useEffect, useRef} from 'react';
import {usePhotoData} from '../../hooks/usePhotoData';
// import FormComment from './FormComment';
import {Text} from '../../UI/Text';
// import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {photoRequestAsync}
  from '../../store/photo/photoAction';

export const Modal = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [post, status, error] = usePhotoData(id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photoRequestAsync(id));
  }, []);

  const overlayRef = useRef(null);

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
          <Text As='p' size={18} tsize={24}>
            Загрузка...
          </Text>)}
        {status === 'error' && (
          <Text As='p' size={18} tsize={24}>
            Ошибка: {error}
          </Text>)}
        {status === 'loaded' && (
          <>
            <Text As='h2' className={style.title} size={18} tsize={24}>
              {post.title}
            </Text>

            <div className={style.content}>

            </div>

            <Text As='p' className={style.author} size={14} tsize={16}>
              {post.author}
            </Text>

            {/* {token ?
              <FormComment /> :
              <Text As='p' color='orange' size={16} tsize={20} bold>
                Авторизуйтесь, чтобы оставлять комментарии
              </Text>
            */}
          </>
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

