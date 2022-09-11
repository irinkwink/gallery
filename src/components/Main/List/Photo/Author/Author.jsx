import style from './Author.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text';

export const Author = ({author, link}) => {
  console.log();
  return (
    <Text
      As='a'
      size={14}
      tsize={16}
      color='white'
      className={style.linkAuthor}
      href={link}
      target='_blank'
      rel='noopener noreferrer'
    >
      {author}
    </Text>
  );
};

Author.propTypes = {
  author: PropTypes.string,
  link: PropTypes.string,
};
