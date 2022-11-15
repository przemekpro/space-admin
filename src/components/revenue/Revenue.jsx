import './revenue.scss'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { useEffect, useState } from 'react'

export default function Revenue() {

    const [amount, setAmount] = useState(null)
    const [lastMonthAmount, setLastMonthAmount] = useState(null)
    const [diff, setDiff] = useState(null)

    const target = 10000


    useEffect(()=> {
        let list=[]
        let list2=[]
        async function fetchData() {
            const today = new Date()
            const thisMonth = new Date(new Date().setMonth(today.getMonth()))
            const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1))
            const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2))

            const thisMonthQuery = query(collection(db, 'orders'), where('timeStamp', '>', lastMonth))
            const lastMonthQuery = query(collection(db, 'orders'), where('timeStamp', '>', prevMonth), where('timeStamp', '<', thisMonth))

            const thisMonthData = await getDocs(thisMonthQuery)
            const lastMonthData = await getDocs(lastMonthQuery)

            thisMonthData.forEach(doc => list.push(Number(doc.data().price)))

            lastMonthData.forEach(doc => list2.push(Number(doc.data().price)))

            const total = list.reduce((acc, curr) => acc + curr )
            const lastMonthTotal = list2.reduce((acc, curr) => acc + curr )
        
            setAmount(total.toLocaleString('en-EN'))
            setDiff(Math.round((total / target)*100))
            setLastMonthAmount(lastMonthTotal.toLocaleString('en-EN'))
        }   
        fetchData()
    }, [])

    return(
        <div className="revenue">
            <div className="revenue__title">Total Revenue</div>
            <div className="revenue__chart">
                <CircularProgressbar 
                    value={diff} 
                    text={`${diff ? diff : '0'}%`} 
                    strokeWidth={6} 
                    styles={buildStyles({
                        pathColor: `rgba(10, 162, 250, ${diff / 100})`,
                        textColor: '#000'
                    })}
                />
            </div>
            <p className="revenue__subtitle">Total sales made this month</p>
            <p className="revenue__today">${amount ? amount : '–'}</p>
            <p className="revenue__info">Previous transactions processing. <span className="revenue__info--new-line">Last payments may not be included.</span></p>
            <div className="revenue__stats">
                <div className="revenue__stats-wrapper">
                    <p className="revenue__stats-title">
                        Target
                    </p>
                    <p className="revenue__stats-counter">
                        ${target.toLocaleString('en-EN')}
                    </p>
                </div>
                <div className="revenue__stats-wrapper">
                    <p className="revenue__stats-title">
                        Last month
                    </p>
                    <p className="revenue__stats-counter">
                        ${lastMonthAmount ? lastMonthAmount : '–'}
                    </p>
                </div>
            </div>
        </div>
    )
}