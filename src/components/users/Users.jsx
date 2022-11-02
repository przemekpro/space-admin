import './users.scss'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Delete, ViewHeadline } from '@mui/icons-material';
import { useState } from 'react';



export default function Transactions() {

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState('')

    const users = searchResults || [
        {id: 1,
        img: '',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        city: 'New York'
        },
        {id: 2,
        img: '',
        firstName: 'Jack',
        lastName: 'Schmoe',
        email: 'jack@schmoe.com',
        city: 'Los Angeles'
        },
        {id: 3,
        img: '',
        firstName: 'Kate',
        lastName: 'Smith',
        email: 'kate@smith.com',
        city: 'Warsaw'
        },
        {id: 4,
        img: '',
        firstName: 'Matt',
        lastName: 'Loop',
        email: 'matt@loop.com',
        city: 'Cracow'
        },
        {id: 5,
        img: '',
        firstName: 'Caroline',
        lastName: 'Smart',
        email: 'caroline@smart.com',
        city: 'London'
        },
        {id: 6,
        img: '',
        firstName: 'Chris',
        lastName: 'Fischer',
        email: 'chris@fischer.com',
        city: 'Berlin'
        },
    ]

    function onChange(event) {
        setSearchResults('')
        setSearch(event.target.value)
    }

    function handleChange(event) {
        event.preventDefault()
        const newArray = [...users]
        const filter = newArray.filter(result => result.firstName.toLowerCase().includes(search.toLowerCase()) || result.lastName.toLowerCase().includes(search.toLowerCase()) || result.email.toLowerCase().includes(search.toLowerCase()) || result.city.toLowerCase().includes(search.toLowerCase()))
        setSearchResults(filter)
    }




    return (
        <div className="users">
            <h1 className="users__title">Users</h1>
            <form onSubmit={handleChange} className='users__form'>
                <input onChange={onChange} type='text' className='users__search' placeholder='Search...' />
                <button className='users__search-button'>Search</button>
            </form>
            <div className="users__container">
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align='center'>First Name</TableCell>
                        <TableCell align='center'>Last Name</TableCell>
                        <TableCell align='center'>Email</TableCell>
                        <TableCell align='center'>City</TableCell>
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id} p={'2em'} sx={{'&:last-child td, &:last-child th': { border: 0 }}}>
                            <TableCell component="th" scope="row">
                                {user.id}
                            </TableCell>
                            <TableCell align='center'>{user.firstName}</TableCell>
                            <TableCell align='center'>{user.lastName}</TableCell>
                            <TableCell align='center'>{user.email}</TableCell>
                            <TableCell align='center'>{user.city}</TableCell>
                            <TableCell align='center'>
                                <div className="users__actions">
                                    <ViewHeadline className='users__view-icon'/>
                                    <Delete className='users__delete-icon'/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}