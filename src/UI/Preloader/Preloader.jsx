import PulseLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types';
import style from './Preloader.module.css';

export const Preloader = ({size}) => {
  console.log();
  return (
    <PulseLoader
      className={style.preloader}
      color='#cc6633'
      size={size} />
  );
};

Preloader.propTypes = {
  size: PropTypes.number,
};
