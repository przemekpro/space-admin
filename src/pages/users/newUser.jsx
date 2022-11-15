import UserForm from "../../components/form/UserForm";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../../redux/usersSlice";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


export default function NewUser() {

    const {users} = useSelector(state => state.users)

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
        const duplicateEmail = users.some(user => user.email.toLowerCase() === data.email.toLowerCase())
        const usersId = users.map(user => parseInt(user.id))
        const lastId = usersId.length > 0 ? Math.max(...usersId) : 0

        if (!duplicateEmail) {
            dispatch(addUser({
                id: lastId + 1,
                img: selectedImg ? URL.createObjectURL(selectedImg) : '',
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                city: data.city,
            }))
            navigate('/users')
        } else if (duplicateEmail) {
            setPopUp(true)
            setErrorDuplicate('Email already in use')
            closePopUp()
        }
    }

    return(
        <UserForm 
            title={'Add new user'}
            submitButton={'Add new user'}
            handleRegister={handleRegister}
            popUp={popUp}
            handleUpload={handleUpload}
            selectedImg={selectedImg}
            errorDuplicate={errorDuplicate}
            deletePhoto={deletePhoto}
            prevButton={'Users'}
            prevPage={'users'}
        />
    )
}