import './app.scss'
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home'
import Users from './components/users/Users'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login/login';


function App() {

  const loggedIn = true

  function RequireAuth(props) {
    return loggedIn ? props.children : <Navigate to='/login' />
  }

  return (
    <div className="app">
      <aside className="app-sidebar">
        <Sidebar />
      </aside>
      <div className="app-wrapper">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
            <Route path='/users' element={<RequireAuth><Users /></RequireAuth>} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
