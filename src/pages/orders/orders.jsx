import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Transactions from '../../components/transactions/Transactions'
import { getOrders } from '../../redux/ordersSlice'



export default function Orders() {

    const {orders} = useSelector(state => state.orders)

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders))
      }, [orders])

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState('')

    function onChange(e) {
        const {value} = e.target
        setSearch(value)
        !value && setSearchResults()
    }

    function handleChange(e) {
        e.preventDefault()
        const filter = orders.filter(result => 
            result.orderNumber.includes(search) ||
            result.product.toLowerCase().includes(search.toLowerCase()) ||
            result.customer.toLowerCase().includes(search.toLowerCase()) ||
            result.date.includes(search) ||
            result.price.toLowerCase().includes(search.toLowerCase()) ||
            result.payment.toLowerCase().includes(search.toLowerCase()) ||
            result.status.toLowerCase().includes(search.toLowerCase())
        )
        setSearchResults(filter)
    }


    const tableHead = [
        {id: 1, field: 'id', header: 'Order No.'}, 
        {id: 2, field: 'product', header: 'Product'}, 
        {id: 3, field: 'customer',  header: 'Customer'}, 
        {id: 4, field: 'date', header: 'Date'}, 
        {id: 5, field: 'price', header: 'Price'}, 
        {id: 6, field: 'payment', header: 'Payment Method'}, 
        {id: 7, field: 'status', header: 'Status'}, 
    ]

    return (
        <Transactions 
            title={"Orders"}
            tableHead={tableHead}
            orders={orders}
            action={getOrders}
            onChange={onChange}
            handleChange={handleChange}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
        />
    )
}