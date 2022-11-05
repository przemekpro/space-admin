import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { useSelector } from "react-redux";


export default function RequireAuth() {
    const {currentUser} = useSelector(state => state.auth)

    return (
      currentUser ? 
      <div className="app__logged-in-wrapper">
        <div className="app-sidebar">
          <Sidebar />
        </div>
        <div className="app-wrapper">
          <Navbar />
          <div className="app-content">
            <Outlet />
          </div>
        </div>
      </div>
      : 
      <Navigate to='/login' />
    )
  }