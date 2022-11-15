import { Settings, AccountCircle } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './navbar.scss'

export default function Navbar() {

    const {currentUser} = useSelector(state => state.auth)

    const img = currentUser.img

    
    return (
        <header className="navbar-header">
            <nav className="navbar">
                <ul className="navbar__links">
                    <li className="navbar__item">
                        <Settings fontSize='medium' className='navbar__icon' />
                    </li>
                    <Link to='/profile'>
                        <li className="navbar__item">
                            {
                                img ?
                                <img src={img} alt='avatar' className='navbar__avatar' /> :
                                <AccountCircle sx={{width: '46px', height: '46px', color: 'rgb(86, 85, 85)'}}/>
                            }
                        </li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}