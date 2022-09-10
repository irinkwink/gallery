import style from './Date.module.css';
import PropTypes from 'prop-types';
import formatDate from '../../../../../utils/formatDate';

export const Date = ({date}) => {
  console.log();
  return (
    <time className={style.date} dateTime={date}>
      {formatDate(date)}
    </time>
  );
};

Date.propTypes = {
  date: PropTypes.string,
};
