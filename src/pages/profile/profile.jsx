import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../../components/form/UserForm";
import { editUser } from "../../redux/authSlice";


export default function Profile() {

    const {currentUser} = useSelector(state => state.auth)

    const {img, firstName, lastName, email, city} = currentUser

    const [selectedImg, setSelectedImg] = useState()
    const [deleteImg, setDeleteImg] = useState(false)
    const [popUp, setPopUp] = useState(false)

    const dispatch = useDispatch()
    
    
    function closePopUp() {setTimeout(() => setPopUp(false), 3000)}


    function handleRegister(data) {
        dispatch(editUser({
            ...data,
            id: currentUser.uid, 
            email: currentUser.email,
            img: selectedImg ? URL.createObjectURL(selectedImg) : '',
            }))
        setPopUp(true)
        closePopUp()
    }

    function handleUpload(e) {
        setSelectedImg(e.target.files[0])
        setDeleteImg(false)
    }

    function deletePhoto() {
        setSelectedImg()
        setDeleteImg(true)
    }

    return (
        <UserForm 
            title={'My Profile'}
            submitButton={'Save'}
            img={deleteImg ? '' : img}
            firstName={firstName}
            lastName={lastName}
            email={email}
            city={city}
            prevPage={''}
            prevButton={'Dashborad'}
            popUp={popUp}
            handleRegister={handleRegister}
            handleUpload={handleUpload}
            deletePhoto={deletePhoto}
            selectedImg={selectedImg}
            deleteImg={deleteImg}
            name={'profile'}
        />
    )
}