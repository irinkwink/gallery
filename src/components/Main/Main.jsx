import style from './Main.module.css';
import Layout from '../Layout';
import List from './List';
import {Route, Routes} from 'react-router-dom';
import PhotoPage from '../PhotoPage';
import {Text} from '../../UI/Text';

export const Main = props => {
  console.log();
  return (
    <main className={style.main}>
      <Layout>
        <Routes>
          <Route path='photo/:id' element={
            <>
              <PhotoPage />
            </>
          }></Route>
          <Route path='/' element={
            <List />
          } />
          <Route path='*' element={
            <div className={style.mainPage}>
              <Text As='p' color='orange' size={20} tsize={24} center>
                Oшибка 404
              </Text>
              <Text As='p' size={16} tsize={18} center>
                Страницы с таким адресом не существует!
              </Text>
            </div>
          }/>
        </Routes>
      </Layout>
    </main>
  );
};
