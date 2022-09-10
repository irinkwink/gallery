import {useState} from 'react';
import style from './FormComment.module.css';
import {Text} from '../../../UI/Text';
import {useSelector, useDispatch} from 'react-redux';
import {updateComment} from '../../../store/commentReducer';


export const FormComment = () => {
  const value = useSelector(state => state.comment.comment);
  const auth = useSelector(state => state.auth.data);
  const dispatch = useDispatch();
  const [isShowForm, setIsShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };

  const handleChange = (e) => {
    dispatch(updateComment(e.target.value));
  };

  return (
    <>
      {isShowForm ?
        <form className={style.form} onSubmit={handleSubmit}>
          <Text As='h3' size={14} tsize={18}>{auth.name}</Text>
          <textarea
            className={style.textarea}
            value={value}
            onChange={handleChange}
            autoFocus={true}
            required
          ></textarea>
          <button className={style.btn} type='submit'>Отправить</button>
        </form> :
        <button
          className={style.btn}
          onClick={() => setIsShowForm(true)}
        >
          Написать комментарий
        </button>
      }
    </>
  );
};
