import './home.scss'
import Widget from '../../components/widget/Widget'
import Revenue from '../../components/revenue/Revenue'
import Chart from '../../components/chart/Chart'


export default function Home() {
    return (
        <div className="home">
            <div className="home__widgets">
                <Widget />
                <Widget />
                <Widget />
                <Widget />
            </div>
            <div className="home__charts">
                <Revenue />
                <Chart />
            </div>
        </div>
    )
}