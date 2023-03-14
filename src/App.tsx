import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import './App.css';

function App() {
  const authSlice = useSelector((state: any) => state.auth);

  return (
    <div className="App">
      <Header />
      <Routes>
        {
          authSlice ?
            <Route path='*' element={<Main />}></Route>
            :
            <Route path='*' element={<LandingPage />}></Route>
        }
      </Routes>
    </div>
  );
}

export default App;
