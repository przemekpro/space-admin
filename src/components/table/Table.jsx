import './table.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

const rows = [
    {id: 1,
    order: 45345,
    image: 'https://files.refurbed.com/ii/iphone-13-pro-max-1631712293.jpg',
    product: 'iPhone 13 Pro Max',
    customer: 'John Smith',
    date: '2022-09-20',
    amount: 999,
    payment: 'Online',
    status: 'Approved'
},
{id: 2,
    order: 44345,
    image: 'https://files.refurbed.com/ii/iphone-13-pro-max-1631712293.jpg',
    product: 'iPhone 13 Pro Max',
    customer: 'John Doe',
    date: '2022-09-23',
    amount: 999,
    payment: 'Cash on delivery',
    status: 'Approved'
},
{id: 3,
    order: 45655,
    image: 'https://files.refurbed.com/ii/iphone-13-pro-max-1631712293.jpg',
    product: 'iPhone 13 Pro Max',
    customer: 'Kate Doe',
    date: '2022-09-22',
    amount: 999,
    payment: 'Online',
    status: 'Pending'
},
{id: 4,
    order: 45346,
    image: 'https://a.allegroimg.com/s1024/0cc2e7/7c2d8ade4f0db2b10f500a2aa31a',
    product: 'MacBook Pro 16',
    customer: 'Caroline Doe',
    date: '2022-09-28',
    amount: 1999,
    payment: 'Cash on delivery',
    status: 'Approved'
},
{id: 5,
    order: 45333,
    image: 'https://files.refurbed.com/ii/iphone-13-pro-max-1631712293.jpg',
    product: 'iPhone 13 Pro Max',
    customer: 'Sam Doe',
    date: '2022-09-21',
    amount: 999,
    payment: 'Online',
    status: 'Pending'
},
]

export default function Transactions() {
    return (
        <div className="transactions">
            <h1 className="transactions__title">Last transactions</h1>
            <div className="transactions__container">
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Order Number</TableCell>
                        <TableCell >Product</TableCell>
                        <TableCell >Customer</TableCell>
                        <TableCell >Date</TableCell>
                        <TableCell >Amount</TableCell>
                        <TableCell >Payment Method</TableCell>
                        <TableCell >Status</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} sx={{'&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell component="th" scope="row">
                            {row.order}
                        </TableCell>
                        <TableCell >
                            <div className="transactions__product">
                                <img className="transactions__image" src={row.image} alt="product image"/>
                                {row.product}
                            </div>
                        </TableCell>
                        <TableCell >{row.customer}</TableCell>
                        <TableCell >{row.date}</TableCell>
                        <TableCell >{`$${row.amount}`}</TableCell>
                        <TableCell >{row.payment}</TableCell>
                        <TableCell ><p className={`transactions__${(row.status.toLowerCase())}`}>{row.status}</p></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}