import style from './errorModal.module.css';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Text} from '../../UI/Text';

export const errorModal = ({error}) => {
  console.log();
  return ReactDOM.createPortal(
    <div className={style.error}>
      <Text As='p' color='white' size={18} tsize={24} medium center>
        {error}
      </Text>
    </div>,
    document.getElementById('error-root'),
  );
};

errorModal.propTypes = {
  error: PropTypes.string,
};

