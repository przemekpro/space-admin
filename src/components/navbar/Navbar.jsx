import { Settings, NotificationsNone } from '@mui/icons-material'
import './navbar.scss'

export default function Navbar() {
    return (
        <header className="navbar-header">
            <nav className="navbar">
                <ul className="navbar__links">
                    <li className="navbar__item">
                        <NotificationsNone fontSize='medium' className='navbar__icon' />
                        <span className='navbar__icon-badge'>9</span>
                    </li>
                    <li className="navbar__item">
                        <Settings fontSize='medium' className='navbar__icon' />
                    </li>
                    <li className="navbar__item">
                        <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3560&q=80' alt='avatar' className='navbar__avatar' />
                    </li>
                </ul>
            </nav>
        </header>
    )
}