import style from './Photo.module.css';
import PropTypes from 'prop-types';
import Image from './Image';
import Likes from './Likes';
import Author from './Author';
import Date from './Date';
import {Link} from 'react-router-dom';


export const Photo = ({photoData}) => {
  const id = photoData.id;
  const thumbnail = photoData.urls.regular;
  const alt = photoData.alt_description;
  const author = photoData.user.name;
  const authorLink = photoData.user.links.html;
  const date = photoData.created_at;
  const likes = photoData.likes;
  const isLiked = photoData.liked_by_user;

  return (
    <li className={style.photo}>
      <Link
        className={style.linkPhoto}
        to={`/photo/${id}`}
      >
        <Image link={thumbnail} alt={alt} />
      </Link>

      <div className={style.content}>
        <div className={style.wrapper}>
          <Likes likes={likes} liked={isLiked}/>
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
