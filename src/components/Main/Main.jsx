import style from './Main.module.css';
import PropTypes from 'prop-types';

export const Main = props => {
  console.log();
  return (
    <div className={style.Main}></div>
  );
};

Main.propTypes = {
  name: PropTypes.string,
};
