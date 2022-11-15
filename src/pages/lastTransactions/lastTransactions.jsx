import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export default function LastTransactions() {


    const {orders} = useSelector(state => state.orders)

    const [dataArray, setDataArray] = useState([])

    useEffect(() => {
        const newArray = [...orders]
        const filterTransactions = newArray.slice(-5)
        const sortFromNewest = filterTransactions.sort((a, b) => b.date?.localeCompare(a.date, undefined, {numeric: true}))

        setDataArray(sortFromNewest)
    }, [orders])

    return (
        <div className="transactions transactions-home">
            <h2 className="table__title">Last Transactions</h2>
            <div className="transactions__container">
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                                <TableCell align='center'>Order No.</TableCell>
                                <TableCell align='center'>Product</TableCell>
                                <TableCell align='center'>Customer</TableCell>
                                <TableCell align='center'>Date</TableCell>
                                <TableCell align='center'>Price</TableCell>
                                <TableCell align='center'>Payment Method</TableCell>
                                <TableCell align='center'>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                    {dataArray.map(data => (
                            <TableRow key={data.id} sx={{'&:last-child td, &:last-child th': { border: 0 }}}
                            >
                            <TableCell component="th" scope="row">
                                {data.orderNumber}
                            </TableCell>
                            <TableCell align='center'>
                                <div className="transactions__product transactions__orders">
                                    <img className="transactions__image" src={data.img} alt="product"/>
                                    {data.product}
                                </div>
                            </TableCell>
                            <TableCell align='center'>{data.customer}</TableCell>
                            <TableCell align='center'>{data.date}</TableCell>
                            <TableCell align='center'>${data.price}</TableCell>
                            <TableCell align='center'>{data.payment}</TableCell>
                            <TableCell ><p className={`transactions__${(data.status.toLowerCase())}`}>{data.status}</p></TableCell>
                            </TableRow>
                        )
                    )}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}