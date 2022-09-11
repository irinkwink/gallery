import style from './Photo.module.css';
import PropTypes from 'prop-types';
import Likes from './Likes';
import Author from './Author';
import Date from './Date';
import {Link} from 'react-router-dom';
import {useState} from 'react';


export const Photo = ({photoData}) => {
  const id = photoData.id;
  const thumbnail = photoData.urls.small;
  const alt = photoData.alt_description;
  const author = photoData.user.name;
  const authorLink = photoData.user.links.html;
  const date = photoData.created_at;
  const likes = photoData.likes;
  const isLiked = photoData.liked_by_user;

  const [loading, setLoading] = useState(true);

  const imageLoaded = () => {
    setLoading(false);
  };

  return (
    <li
      className={style.photo}
      style={{visibility: loading ? 'hidden' : 'visible'}}
    >
      <Link
        className={style.linkPhoto}
        to={`/photo/${id}`}
      >
        <img
          className={style.img}
          src={thumbnail}
          alt={alt}
          onLoad={imageLoaded}
        />
      </Link>

      <div className={style.content}>
        <div className={style.wrapper}>
          <Likes likes={likes} liked={isLiked} />
          <Author author={author} link={authorLink} />
        </div>

        <Date date={date} />
      </div>
    </li>
  );
};

Photo.propTypes = {
  photoData: PropTypes.object,
};
