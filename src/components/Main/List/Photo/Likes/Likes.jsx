import style from './Likes.module.css';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {updateLike} from '../../../../../api/like';
import {addError, removeError} from '../../../../../store/errorsReducer';
import {DELAY} from '../../../../../api/const';

export const Likes = ({likes, liked, id}) => {
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  let isLiked = liked;

  const handleLikeClick = (addLikes) => {
    if (token) {
      const method = isLiked ? 'DELETE' : 'POST';
      likes = addLikes + isLiked ? 1 : -1;
      updateLike(id, token, method);
      isLiked = !isLiked;
    } else {
      dispatch(addError('Авторизуйтесь, чтобы осталять лайки'));
      setTimeout(() => {
        dispatch(removeError());
      }, DELAY);
    }
  };


  const like = isLiked ? 'liked' : 'like';

  return (
    <>
      <button
        className={style[like]}
        onClick={() => handleLikeClick(likes)}
      >
        {likes}
      </button>
    </>
  );
};

Likes.propTypes = {
  id: PropTypes.string,
  likes: PropTypes.number,
  liked: PropTypes.bool,
};
