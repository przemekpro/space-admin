import UserForm from "../../components/form/UserForm";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../redux/usersSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Edit() {

    const {users, editedUser} = useSelector(state => state.users)
    const {img, firstName, lastName, email, city} = editedUser

    const [selectedImg, setSelectedImg] = useState()
    const [deleteImg, setDeleteImg] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [errorDuplicate, setErrorDuplicate] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()


    function closePopUp() {setTimeout(() => setPopUp(false), 3000)}

    function handleRegister(data) {
        const otherUsers = users.filter(user => user.id !== editedUser.id )
        const duplicateEmail = otherUsers.some(user => user.email.toLowerCase() === data.email.toLowerCase())
        if (!duplicateEmail) {
            dispatch(editUser({
                id: editedUser.id, 
                img: selectedImg ? URL.createObjectURL(selectedImg) : '',
                ...data}))
            navigate('/users')
        } else if (duplicateEmail) {
            setPopUp(true)
            setErrorDuplicate('Email already in use')
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
        <UserForm 
            title='Edit user'
            submitButton='Save'
            img={deleteImg ? '' : img}
            firstName={firstName}
            lastName={lastName}
            email={email}
            city={city}
            handleRegister={handleRegister}
            handleUpload={handleUpload}
            selectedImg={selectedImg}
            deletePhoto={deletePhoto}
            popUp={popUp}
            errorDuplicate={errorDuplicate}
            prevButton={'Users'}
            prevPage={'users'}
        />
    )
}
