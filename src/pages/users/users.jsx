import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from '../../components/table/Table'
import { deleteUser, getUsers, editData } from '../../redux/usersSlice'


export default function Users() {

    const {users} = useSelector(state => state.users)

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
      }, [users])

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState('')

    function onChange(e) {
        const {value} = e.target
        setSearch(value)
        !value && setSearchResults()
    }

    function handleChange(e) {
        e.preventDefault()
        const filter = users.filter(result => 
            result.firstName.toLowerCase().includes(search.toLowerCase()) ||
            result.lastName.toLowerCase().includes(search.toLowerCase()) ||
            result.email.toLowerCase().includes(search.toLowerCase()) ||
            result.city.toLowerCase().includes(search.toLowerCase())
        )
        setSearchResults(filter)
    }

    const tableHead = [
        {id: 1, field: 'id', header: 'ID'}, 
        {id: 2, field: 'firstName', header: 'First Name'}, 
        {id: 3, field: 'lastName',  header: 'Last Name'}, 
        {id: 4, field: 'email', header: 'Email'}, 
        {id: 5, field: 'city', header: 'City'}
    ]

    const links = {
        edit: '/edit-user',
        new: '/new-user'
    }

    const actions = {
        get: getUsers,
        delete: deleteUser
    }


    return(
        <Table 
            tableHead={tableHead}
            link={links}
            category={'user'}
            action={actions}
            data={users}
            deletingName={'email'}
            editData={editData}
            onChange={onChange}
            handleChange={handleChange}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
        />
    )
}