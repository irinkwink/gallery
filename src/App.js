import {Route, Routes} from 'react-router-dom';
import {getToken} from './api/token';
import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';

function App() {
  getToken();

  return (
    <Routes>
      <Route path='*' element={
        <>
          <Header />
          <Main />
        </>
      }/>
    </Routes>
  );
}

export default App;
