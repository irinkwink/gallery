import {Route, Routes} from 'react-router-dom';
import {getToken} from './api/token';
import Header from './components/Header';
import Main from './components/Main';
import ErrorModal from './components/ErrorModal';

function App() {
  getToken();

  return (
    <Routes>
      <Route path='*' element={
        <>
          <ErrorModal />
          <Header />
          <Main />
        </>
      }/>
    </Routes>
  );
}

export default App;
