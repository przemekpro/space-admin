import './form.scss'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import { AccountCircle, ArrowBack, DeleteOutline } from '@mui/icons-material';


import { useNavigate } from 'react-router-dom';

export default function UserForm(props) {

    const {
        title, 
        handleRegister, 
        popUp, 
        handleUpload, 
        selectedImg, 
        errorDuplicate, 
        deletePhoto, 
        img, 
        firstName, 
        lastName, 
        email, 
        city, 
        prevButton, 
        prevPage, 
        submitButton, 
        name} = props

    const { register, handleSubmit, formState: {errors} } = useForm();
    
    const imgUrl = selectedImg ? URL.createObjectURL(selectedImg) : img

    const navigate = useNavigate()


    return (
        <div className="form">

            <div className={`register__alert ${errorDuplicate ? 'alert-error' : 'alert-success'}`} style={{display: popUp ? 'block' : 'none'}}>
                <p className="register__alert-info">{errorDuplicate ? errorDuplicate : 'Change saved!'}</p>
            </div>

            
            <h2 className="form__title">{title}</h2>
            <form onSubmit={handleSubmit(data => handleRegister(data))} className="form__form">

                <div className="form__avatar-wrapper">
                    <label htmlFor='upload'>
                        <input 
                            id='upload' 
                            type='file' 
                            hidden 
                            accept="image/*"  
                            onChange={e => handleUpload(e)}
                        />

                        
                        {(selectedImg || img) ?

                        <div className="form__avatar-container">
                            <img src={imgUrl} alt="user avatar" className="form__avatar-img" /> 
                        </div> :

                        <div className="form__placeholder-container">
                            <AccountCircle className='form__placeholder-icon' sx={{width: '200px', height: '200px'}} />
                            <p className='form__placeholder-text'>Upload your photo</p>
                        </div>}

                    </label>

                    {(selectedImg || img) && 
                    
                    <button type='button' onClick={() => deletePhoto()} className='form__avatar-remove'>
                        <DeleteOutline fontSize='small'/>
                        Delete
                    </button>}
                    
                </div>

                <div className="form__inputs-wrapper">
                    <TextField 
                        name="firstName" 
                        type='firstName'
                        className="form__input" 
                        label="First Name" 
                        variant="outlined" 
                        placeholder='Joe' 
                        defaultValue={firstName}
                        {...register("firstName", {
                            required: 'First name is required',
                        })} 
                        error={!!errors?.firstName}                 
                        helperText={errors?.firstName ? errors.firstName.message : null}
                    />

                    
                    <TextField 
                        name="lastName" 
                        type='lastName'
                        className="form__input" 
                        label="Last Name" 
                        variant="outlined" 
                        placeholder='Doe' 
                        defaultValue={lastName}
                        {...register("lastName", {
                            required: 'Last name is required',
                    })} 
                        error={!!errors?.lastName}                 
                        helperText={errors?.lastName ? errors.lastName.message : null}
                    />

                    
                    <TextField 
                        name="email" 
                        type='email'
                        className="form__input" 
                        label="Email" 
                        variant="outlined" 
                        placeholder='joe@doe.com' 
                        defaultValue={email}
                        {...register("email", {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Enter a valid email"
                            },
                            disabled: name === 'profile'
                        })}
                        error={!!errors?.email}                 
                        helperText={errors?.email ? errors.email.message : null}
                    />

                    
                    <TextField 
                        name="city" 
                        type='city'
                        className="form__input" 
                        label="City" 
                        variant="outlined" 
                        placeholder='Warsaw' 
                        defaultValue={city}
                        {...register("city", {
                            required: 'City is required',
                    })} 
                        error={!!errors?.city}                 
                        helperText={errors?.city ? errors.city.message : null}
                    />


                    <button className="form__button">{submitButton}</button>
                </div>
            </form>

            <button onClick={() => navigate(`/${prevPage}`)} className='form__back-btn'>
                <ArrowBack fontSize='small'/>
                {prevButton}
            </button>
        </div>
    )
}