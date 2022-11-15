import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import './widget.scss'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { useEffect, useState } from 'react'


export default function Widget(props) {

    const {title, icon} = props

    const [amount, setAmount] = useState(null)
    const [diff, setDiff] = useState(null)


    useEffect(()=> {
        async function fetchData() {
            const today = new Date()
            const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1))
            const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2))

            const lastMonthQuery = query(collection(db, title), where('timeStamp', '<=', today), where('timeStamp', '>', lastMonth))
            const prevMonthQuery = query(collection(db, title), where('timeStamp', '<=', lastMonth), where('timeStamp', '>', prevMonth))

            const lastMonthData = await getDocs(lastMonthQuery)
            const prevMonthData = await getDocs(prevMonthQuery)

            setAmount(lastMonthData.docs.length)
            setDiff(Math.round(((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) * 100))
        }
        fetchData()
    }, [title])

    return(
        <div className="widget">
            <div className="widget__left">
                <p className="widget__title">{title}</p>
                <p className="widget__counter">{amount}</p>
                <Link to={`/${title}`}>
                    <p className="widget__link">See all {title}</p>
                </Link>
            </div>
            <div className="widget__right">
                <p className={`widget__percentage widget__percentage--${diff < 0 ? 'negative' : 'positive'}`}>
                    {diff < 0 ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                    {diff}%</p>
                <p className={`widget__icon widget__icon--${title}`}>{icon}</p>
            </div>
        </div>
    )
}