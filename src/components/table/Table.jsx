import './table.scss'

import {Table as MUITable} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CameraAlt, Delete, ImportExport, ViewHeadline } from '@mui/icons-material';
import { useState } from 'react';

import { Modal } from '@mui/material';

import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';



export default function Table(props) {

    const {
        tableHead, 
        link, 
        category, 
        action, 
        data, 
        deletingName, 
        editData, 
        onChange, 
        handleChange, 
        searchResults, 
        setSearchResults} = props
    
    const [deletingData, setDeletingData] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [toggleSort, setToggleSort] = useState(true)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const dataArray = searchResults ? searchResults : data


    function handleClose() {setOpenModal(false)}


    function handleEdit(e, id) {
        e.preventDefault()
        dispatch(editData(id))
        navigate(link.edit)
    }

    function handleConfirmation(e, id) {
        e.preventDefault()
        findDeleteItem(id) 
    }

    function handleDelete() {
        dispatch(action.delete(deletingData.id))
        searchResults && setSearchResults(prevState => prevState.filter(item => item.id !== deletingData.id))
        setOpenModal(false)
    }

    function findDeleteItem(id) {
        const newArray = data.find(item => item.id === id)
        setDeletingData(newArray)
        setOpenModal(true)
    }

    function sortData(field) {
        setToggleSort(prevState => !prevState)
        const sortAToZ = [...dataArray].sort((a, b) => a[field]?.localeCompare(b[field], undefined, {numeric: true}))
        const sortZToA = [...dataArray].sort((a, b) => b[field]?.localeCompare(a[field], undefined, {numeric: true}))

        const toggle = toggleSort ? sortAToZ : sortZToA
        searchResults ? setSearchResults(toggle) : dispatch(action.get(toggle))
    }


    return (
        <div className="table">
            <h2 className="table__title">{`${category}s`}</h2>
            <div className="table__bar">
                <form onSubmit={(event) => handleChange(event)} className='table__form'>
                    <input onChange={(event) => onChange(event)} type='text' className='table__search' placeholder='Search...' />
                    <button className='table__search-button'>Search</button>
                </form>
                <Link to={link.new}>
                    <button className="table__add-new">{`Add new ${category}`}</button>
                </Link>

            </div>
            <div className="table__container">
                <MUITable sx={{ minWidth: 600 }} aria-label="simple table">
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
            
                            <TableCell align='center' color='rgb(86, 85, 85)'>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        
                    {category === 'user' && dataArray.map(item => (
                        <TableRow key={item.id} p={'2em'} sx={{'&:last-child td, &:last-child th': { border: 0 }}}>
                            
                            <TableCell sx={{pl: '2em'}} component="th" scope="row">{item.id}</TableCell>
                            <TableCell align='center'>{item.firstName}</TableCell>
                            <TableCell align='center'>{item.lastName}</TableCell>
                            <TableCell align='center'>{item.email}</TableCell>
                            <TableCell align='center'>{item.city}</TableCell>
                            <TableCell align='center'>
                                <div className="table__actions">
                                    <button className="table__actions-edit" onClick={e => handleEdit(e, item.id)}><ViewHeadline className='table__view-icon'/></button>
                                    <button className='table__actions-delete' onClick={e => handleConfirmation(e, item.id)}><Delete className='table__delete-icon'/></button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}


                    {category === 'product' && dataArray.map(item => (
                        <TableRow key={item.id} p={'2em'} sx={{'&:last-child td, &:last-child th': { border: 0 }}}>
                            
                            <TableCell component="th" scope="row" sx={{pl: '2em'}}>{item.productNumber}</TableCell>
                            <TableCell >
                                
                                <div className="transactions__product transactions__on-click" onClick={e => handleEdit(e, item.id)}>
                                    {item.img ? <img className="transactions__image" src={item.img} alt="product"/> : <CameraAlt sx={{width: '50px', height: '50px', color: 'gray'}}/>}
                                    {item.name}
                                </div>
                            </TableCell>
                            <TableCell align='center'>${item.price}</TableCell>
                            <TableCell align='center'>{item.stock}</TableCell>
                            <TableCell align='center'>
                                <div className="table__actions">
                                    <button className="table__actions-edit" onClick={e => handleEdit(e, item.id)}><ViewHeadline className='table__view-icon'/></button>
                                    <button className='table__actions-delete' onClick={e => handleConfirmation(e, item.id)}><Delete className='table__delete-icon'/></button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </MUITable>

                {dataArray.length === 0 && 
                <div className="table__info">
                    <p>{`No ${category}s found :(`}</p>
                </div>}

            </div>

            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <div className="delete__wrapper">
                    <p className="delete__text">Are you sure you want to delete <strong>{deletingData && deletingData[deletingName]}</strong>?</p>
                    <div className="delete__actions">
                        <button onClick={handleClose} className='delete__btn delete-cancel'>Cancel</button>
                        <button onClick={handleDelete} className='delete__btn'>Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}