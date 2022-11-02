import './sidebar.scss'
import {RocketLaunch, Dashboard, Group, ShoppingCart, Store, Person, Logout} from '@mui/icons-material';
import {Link} from "react-router-dom"




export default function Sidebar() {
    return (
        <div className="sidebar">
            <Link to='/'>
                <header className="logo">
                    <RocketLaunch className='logo__icon' sx={{fontSize: '1.8rem'}} />
                    <h1 className="logo__text"><span className="logo__text--highlight">Space</span>Admin</h1>
                </header>
            </Link>
            <hr className='sidebar__divider'/>
            <body>
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
                        <li className="nav__item">
                            <Store />
                            <span>Products</span>
                        </li>
                        <li className="nav__item">
                            <ShoppingCart />
                            <span>Orders</span>
                        </li>
                        <p className="nav__title">USER</p>
                        <li className="nav__item">
                            <Person />
                            <span>Profile</span>
                        </li>
                        <li className="nav__item">
                            <Logout />
                            <span>Logout</span>
                        </li>
                    </ul>
                </nav>
            </body>
        </div>
    )
}