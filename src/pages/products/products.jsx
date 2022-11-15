import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from '../../components/table/Table'
import { deleteProduct, editData, getProducts } from '../../redux/productsSlice'

export default function Products() {

    const {products} = useSelector(state => state.products)

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products))
      }, [products])

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState('')

    function onChange(e) {
        const {value} = e.target
        setSearch(value)
        !value && setSearchResults()
    }

    function handleChange(e) {
        e.preventDefault()
        const filter = products.filter(result => 
            result.productNumber.toLowerCase().includes(search.toLowerCase()) ||
            result.name.toLowerCase().includes(search.toLowerCase()) ||
            result.price.toLowerCase().includes(search.toLowerCase()) ||
            result.stock.toLowerCase().includes(search.toLowerCase())
        )
        setSearchResults(filter)
    }

    const tableHead = [
        {id: 1, field: 'id', header: 'Product No.'}, 
        {id: 2, field: 'name', header: 'Product'}, 
        {id: 3, field: 'price',  header: 'Price'}, 
        {id: 4, field: 'stock', header: 'Stock'}, 
    ]

    const links = {
        edit: '/edit-product',
        new: '/new-product'
    }

    const actions = {
        get: getProducts,
        delete: deleteProduct
    }


    return(
        <Table 
            tableHead={tableHead}
            link={links}
            category={'product'}
            action={actions}
            data={products}
            deletingName={'name'}
            editData={editData}
            onChange={onChange}
            handleChange={handleChange}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
        />
    )
}