import { KeyboardArrowUp, Person } from '@mui/icons-material'
import './widget.scss'

export default function Widget() {
    return(
        <div className="widget">
            <div className="widget__left">
                <p className="widget__title">Users</p>
                <p className="widget__counter">760</p>
                <p className="widget__link">See all users</p>
            </div>
            <div className="widget__right">
                <p className="widget__percentage">
                    <KeyboardArrowUp />
                    5%</p>
                <p className="widget__icon"><Person /></p>
            </div>
        </div>
    )
}