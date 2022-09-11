import style from './ErrorModal.module.css';
import ReactDOM from 'react-dom';
import {useSelector} from 'react-redux';
import {generateRandomId} from '../../utils/generateRandomId';
import Error from './Error';
import Layout from '../Layout';

export const ErrorModal = () => {
  const errors = useSelector(state => state.errors.errors);

  return ReactDOM.createPortal(
    <ul className={style.errors}>
      {errors.length > 0 &&
        <Layout >
          {errors.map(error =>
            <Error key={generateRandomId()} error={error} />)}
        </Layout>}
    </ul>,
    document.getElementById('error-root'),
  );
};


