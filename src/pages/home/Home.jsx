import './home.scss'
import Widget from '../../components/widget/Widget'
import Revenue from '../../components/revenue/Revenue'
import Chart from '../../components/chart/Chart'
import LastTransactions from '../lastTransactions/lastTransactions'
import { Person, ShoppingCart, Store } from '@mui/icons-material'

export default function Home() {


    return (
        <div className="home">
            <div className="home__widgets">
                <Widget 
                    title={'users'}
                    icon={<Person />}
                />
                <Widget 
                    title={'products'}
                    icon={<Store />}
                />
                <Widget 
                    title={'orders'}
                    icon={<ShoppingCart />}
                />
            </div>
            <div className="home__charts">
                <Revenue />
                <Chart />
            </div>
            <LastTransactions />
        </div>
    )
}