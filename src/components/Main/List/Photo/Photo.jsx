import style from './Photo.module.css';
import PropTypes from 'prop-types';
import Image from './Image';
import Likes from './Likes';
import Author from './Author';
import Date from './Date';
import {Link} from 'react-router-dom';


export const Photo = ({photoData}) => {
  const id = photoData.id;
  console.log('id: ', id);
  const thumbnail = photoData.urls.regular;
  console.log('thumbnail: ', thumbnail);
  const alt = photoData.alt_description;
  console.log('alt: ', alt);
  const author = photoData.user.name;
  console.log('author: ', author);
  const authorLink = photoData.user.links.html;
  console.log('authorLink: ', authorLink);
  const date = photoData.created_at;
  console.log('date: ', date);
  const likes = photoData.likes;
  console.log('likes: ', likes);
  const isLiked = photoData.liked_by_user;
  console.log('isLiked: ', isLiked);

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
