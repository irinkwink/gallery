import style from './Image.module.css';
import notPhoto from './img/notphoto.jpg';
import PropTypes from 'prop-types';

export const Image = ({link, alt}) => {
  const linkImg = link.includes('https') ?
    link :
    notPhoto;

  return (
    <img className={style.img} src={linkImg} alt={alt} />
  );
};

Image.propTypes = {
  link: PropTypes.string,
  alt: PropTypes.string,
};
