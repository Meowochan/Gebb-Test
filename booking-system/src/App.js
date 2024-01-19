import Header from './components/Header/header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './components/Pages/profile';
import Movies from './components/Pages/movies';
import Login from './components/Pages/login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='profile' element={<Profile/>}/>
        <Route path='' element={<Movies />}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
