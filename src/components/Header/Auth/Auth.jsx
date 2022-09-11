import {useEffect, useState} from 'react';
import style from './Auth.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as AuthIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useDispatch} from 'react-redux';
import {deleteToken} from '../../../store/tokenReducer';
import {useAuth} from '../../../hooks/useAuth';
import Preloader from '../../../UI/Preloader';
import {useNavigate} from 'react-router-dom';
import {addError, removeError} from '../../../store/errorsReducer';
import {DELAY} from '../../../api/const';

export const Auth = () => {
  const dispatch = useDispatch();
  const [auth, loading, error, clearAuth] = useAuth();
  const navigate = useNavigate();
  const [isExit, setExit] = useState(false);

  const logOut = () => {
    dispatch(deleteToken());
    clearAuth();
  };

  useEffect(() => {
    if (error) {
      navigate(`/`);

      const errorMessage = error.includes('status code 403') ?
      `Исчерпан лимит запросов` :
      `Ошибка авторизации`;

      dispatch(addError(errorMessage));
      setTimeout(() => {
        dispatch(removeError());
        clearAuth();
      }, DELAY);
    }
  }, [error]);


  return (
    <div className={style.container}>
      {loading ? (
        <Preloader size={30}/>
      ) : auth.name ? (
        <>
          <div className={style.auth}>
            {isExit && (
              <button
                className={style.logout}
                onClick={logOut}
              >
                Выйти
              </button>
            )}
            <button className={style.btn}>
              <img
                className={style.img}
                src={auth.img}
                title={auth.name}
                alt={`Аватар ${auth.name}`}
                onClick={() => setExit(!isExit)}
              />
            </button>
            <Text As='p' color='black' size={14} tsize={16} bold>
              {auth.name}
            </Text>
          </div>
        </>
      ) : (
        <Text className={style.authLink} As='a' href={urlAuth}>
          <AuthIcon className={style.svg} width={128} height={128} />
        </Text>
      )}
    </div>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
  delToken: PropTypes.func,
};
