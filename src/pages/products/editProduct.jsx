import ProductForm from "../../components/form/ProductForm"
import { useSelector, useDispatch } from "react-redux";
import { editProduct } from "../../redux/productsSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditProduct() {


    const {products, editedProduct} = useSelector(state => state.products)
    const {img, productNumber, name, price, stock} = editedProduct

    const [selectedImg, setSelectedImg] = useState()
    const [deleteImg, setDeleteImg] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [errorDuplicate, setErrorDuplicate] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()


    function closePopUp() {setTimeout(() => setPopUp(false), 3000)}

    function handleRegister(data) {
        const otherProducts = products.filter(product => product.id !== editedProduct.id )
        const duplicateProduct = otherProducts.some(product => product.productNumber === data.productNumber)
        if (!duplicateProduct) {
            dispatch(editProduct({
                id: editedProduct.id, 
                img: selectedImg ? URL.createObjectURL(selectedImg) : '',
                ...data}))
            navigate('/products')
        } else if (duplicateProduct) {
            setPopUp(true)
            setErrorDuplicate('Product number already exists')
            closePopUp()
        }
    }

    function handleUpload(e) {
        setSelectedImg(e.target.files[0])
        setDeleteImg(false)
    }

    function deletePhoto() {
        setSelectedImg()
        setDeleteImg(true)
    }

    return(
        <ProductForm 
            title='Edit product'
            submitButton='Save'
            img={deleteImg ? '' : img}
            productNumber={productNumber}
            name={name}
            price={price}
            stock={stock}
            handleRegister={handleRegister}
            handleUpload={handleUpload}
            selectedImg={selectedImg}
            deletePhoto={deletePhoto}
            popUp={popUp}
            errorDuplicate={errorDuplicate}
        />
    )
}