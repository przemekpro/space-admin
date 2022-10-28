import './revenue.scss'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { KeyboardArrowUp } from '@mui/icons-material';

export default function Revenue() {
    return(
        <div className="revenue">
            <div className="revenue__title">Total Revenue</div>
            <div className="revenue__chart">
                <CircularProgressbar 
                    value={70} 
                    text={'70%'} 
                    strokeWidth={6} 
                    styles={buildStyles({
                        pathColor: `rgba(10, 162, 250, ${70 / 100})`,
                        textColor: '#000'
                    })}
                />
            </div>
            <p className="revenue__subtitle">Total sales made today</p>
            <p className="revenue__today">$570</p>
            <p className="revenue__info">Previous transactions processing. <span className="revenue__info--new-line">Last payments may not be included.</span></p>
            <div className="revenue__stats">
                <div className="revenue__stats-wrapper">
                    <p className="revenue__stats-title">
                        Target
                    </p>
                    <p className="revenue__stats-counter">
                        <KeyboardArrowUp />
                        18.2k
                    </p>
                </div>
                <div className="revenue__stats-wrapper">
                    <p className="revenue__stats-title">
                        Last week
                    </p>
                    <p className="revenue__stats-counter">
                        <KeyboardArrowUp />
                        14.6k
                    </p>
                </div>
                <div className="revenue__stats-wrapper">
                    <p className="revenue__stats-title">
                        Last month
                    </p>
                    <p className="revenue__stats-counter">
                        <KeyboardArrowUp />
                        18.2k
                    </p>
                </div>
            </div>
        </div>
    )
}