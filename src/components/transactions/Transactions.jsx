import './transactions.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { ImportExport } from '@mui/icons-material';
import { useDispatch } from 'react-redux';


export default function Transactions(props) {

    const {
        tableHead, 
        orders, 
        title, 
        action, 
        onChange,
        handleChange, 
        searchResults, 
        setSearchResults} = props

    const [toggleSort, setToggleSort] = useState(true)

    const dataArray =  searchResults ? searchResults : orders

    const dispatch = useDispatch()


    function sortData(field) {
        setToggleSort(prevState => !prevState)
        const sortAToZ = [...dataArray].sort((a, b) => a[field]?.localeCompare(b[field], undefined, {numeric: true}))
        const sortZToA = [...dataArray].sort((a, b) => b[field]?.localeCompare(a[field], undefined, {numeric: true}))

        const toggle = toggleSort ? sortAToZ : sortZToA
        searchResults ? setSearchResults(toggle) : dispatch(action(toggle))
    }

    return (
        <div className="transactions">
            <h2 className="table__title">{title}</h2>
            <div className="table__bar">
                <form onSubmit={(event) => handleChange(event)} className='table__form'>
                    <input onChange={(event) => onChange(event)} type='text' className='table__search' placeholder='Search...' />
                    <button className='table__search-button'>Search</button>
                </form>
            </div>
            <div className="transactions__container">
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        {tableHead.map(item => (
                            <TableCell key={item.id}>
                                <button 
                                    className={`table__sort-btn ${item.field === 'id' ? 'table__left-column' : ''}`}
                                    onClick={() => sortData(item.field)}>

                                        {item.header}
                                        <ImportExport fontSize='small' />
                                        
                                </button>
                            </TableCell>
                        )
                        )}
                    </TableRow>
                    </TableHead>
                    <TableBody>
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

                {dataArray.length === 0 && 
                <div className="table__info">
                    <p>No orders found :(</p>
                </div>}
            </div>

        </div>
    )
}