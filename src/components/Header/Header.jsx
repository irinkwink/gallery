import style from './Header.module.css';
import PropTypes from 'prop-types';

export const Header = props => {
  console.log();
  return (
    <div className={style.Header}></div>
  );
};

Header.propTypes = {
  name: PropTypes.string,
};
