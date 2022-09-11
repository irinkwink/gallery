import style from './Error.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../UI/Text';

export const Error = ({error}) => {
  console.log();
  return (
    <li className={style.error}>
      <Text As='p' color='white' size={20} tsize={24} medium >
        {error}
      </Text>
    </li>
  );
};

Error.propTypes = {
  error: PropTypes.string,
};
