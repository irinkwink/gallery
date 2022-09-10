import style from './Likes.module.css';
import PropTypes from 'prop-types';

export const Likes = ({likes, liked}) => {
  console.log();
  const like = liked ? 'liked' : 'like';

  return (
    <>
      <button className={style[like]}>
        {likes}
      </button>
    </>
  );
};

Likes.propTypes = {
  likes: PropTypes.number,
  liked: PropTypes.bool,
};
