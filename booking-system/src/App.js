import Header from './components/Header/header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Status from './components/Pages/status';
import Movies from './components/Pages/movies';
import Login from './components/Pages/login';
import Register from './components/Pages/register';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='status' element={<Status/>}/>
        <Route path='' element={<Movies />}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
