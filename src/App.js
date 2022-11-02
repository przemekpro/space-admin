import './app.scss'
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home'
import Users from './components/users/Users'
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="app">
      <aside className="app-sidebar">
        <Sidebar />
      </aside>
      <div className="app-wrapper">
        <Navbar />
        <div className="app-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<Users />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
