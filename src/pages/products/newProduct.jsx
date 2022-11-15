import ProductForm from "../../components/form/ProductForm"
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from "../../redux/productsSlice";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


export default function NewProduct() {

    const {products} = useSelector(state => state.products)

    const [popUp, setPopUp] = useState(false)
    const [errorDuplicate, setErrorDuplicate] = useState('')
    const [selectedImg, setSelectedImg] = useState()


    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleUpload(e) {
        setSelectedImg(e.target.files[0])
    }

    function deletePhoto() {
        setSelectedImg('')
    }

    function closePopUp() {setTimeout(() => setPopUp(false), 3000)}


    function handleRegister(data) {
        const duplicateNumber = products.some(product => product.productNumber === data.productNumber)
        const productsId = products.map(product => parseInt(product.id))
        const lastId = productsId.length > 0 ? Math.max(...productsId) : 0

        if (!duplicateNumber) {
            dispatch(addProduct({
                id: lastId + 1,
                img: selectedImg ? URL.createObjectURL(selectedImg) : '',
                name: data.name,
                productNumber: data.productNumber,
                price: data.price,
                stock: data.stock 
            }))
            navigate('/products')
        } else if (duplicateNumber) {
            setPopUp(true)
            setErrorDuplicate('Product number already exists')
            closePopUp()
        }
    }

    return(
        <ProductForm 
            title='Add new product'
            submitButton='Add new product'
            handleRegister={handleRegister}
            popUp={popUp}
            handleUpload={handleUpload}
            selectedImg={selectedImg}
            errorDuplicate={errorDuplicate}
            deletePhoto={deletePhoto}
        />
    )
}

