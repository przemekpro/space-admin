import './sidebar.scss'
import {RocketLaunch, Dashboard, Group, ShoppingCart, Store, Person, Logout} from '@mui/icons-material';
import {Link, useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { signIn } from '../../redux/authSlice';


export default function Sidebar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout(e) {
        e.preventDefault()
        signOut(auth).then(() => {
            dispatch(signIn(null))
            navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className="sidebar">
            <Link to='/'>
                <header className="logo">
                    <RocketLaunch className='logo__icon' sx={{fontSize: '1.8rem'}} />
                    <h1 className="logo__text"><span className="logo__text--highlight">Space</span>Admin</h1>
                </header>
            </Link>
            <hr className='sidebar__divider'/>
            <div className='sidebar__wrapper'>
                <nav className="nav">
                    <ul className="nav__list">
                        <p className="nav__title">MAIN</p>
                        <Link to='/'>
                            <li className="nav__item">
                                <Dashboard />
                                
                                    <span>Dashborad</span>
                            </li>
                        </Link>
                        <p className="nav__title">LISTS</p>
                        <Link to='/users'>
                            <li className="nav__item">
                                <Group />
                                    <span>Users</span>
                            </li>
                        </Link>
                        <Link to='/products'>
                            <li className="nav__item">
                                <Store />
                                <span>Products</span>
                            </li>
                        </Link>
                        <Link to='/orders'>
                            <li className="nav__item">
                                <ShoppingCart />
                                <span>Orders</span>
                            </li>
                        </Link>
                        <p className="nav__title">USER</p>
                        <Link to='/profile'>
                            <li className="nav__item">
                                <Person />
                                <span>Profile</span>
                            </li>
                        </Link>
                        <li className="nav__item" onClick={handleLogout}>
                            <Logout />
                            <span>Logout</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}