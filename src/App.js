import './app.scss'
import Home from './pages/home/Home'
import Users from './components/users/Users'
import Login from './pages/login/login';
import Register from './pages/register/register';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import RequireAuth from './utlis/RequireAuth';



function App() {

  const {currentUser} = useSelector(state => state.auth)
    

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <div className="app">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<RequireAuth />} >
              <Route path='/' element={<Home />} />
              <Route path='/users' element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
