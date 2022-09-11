import style from './Likes.module.css';
import PropTypes from 'prop-types';

export const Likes = ({likes, liked}) => {
  const like = liked ? 'liked' : 'like';

  return (
    <>
      <div className={style[like]}>
        {likes}
      </div>
    </>
  );
};

Likes.propTypes = {
  likes: PropTypes.number,
  liked: PropTypes.bool,
};
