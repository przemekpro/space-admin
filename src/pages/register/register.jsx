import { CircularProgress, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './register.scss'
import { useForm } from "react-hook-form";
import { serverTimestamp, doc, setDoc  } from "firebase/firestore"; 
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';




export default function Register() {

    const { register, handleSubmit, getValues, formState: {errors}, reset } = useForm();

    const [popUp, setPopUp] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()

    function redirect() {
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    function closePopUp() {
        setTimeout(() => {
            setPopUp(false)
        }, 5000)
    }


    async function handleRegister() {
        setErrMsg('')
        setLoader(true)
        try {
            const res = await createUserWithEmailAndPassword(auth, getValues().email, getValues().password)
            await setDoc(doc(db, "registeredUsers", res.user.uid), {
                email: getValues().email,
                uid: res.user.uid,
                timeStamp: serverTimestamp()
            }); 
            reset()
            setLoader(false)
            setPopUp(true)
            redirect()
            
        } catch(e) {
            if (e.code === 'auth/email-already-in-use') {
                setErrMsg('Email already in use')
            }
            setLoader(false)
            setPopUp(true)
            closePopUp()
        }
    }

    return(
        <div className="register">
            <div className="register__wrapper">
                <div className={`register__alert ${errMsg ? 'alert-error' : 'alert-success'}`} style={{display: popUp ? 'block' : 'none'}}>
                    <p className="register__alert-info">{errMsg ? errMsg : 'Your account was created!'}</p>
                </div>

                <h2 className="register__title">Create new account</h2>
                <form onSubmit={handleSubmit(handleRegister)} className="register__form">

                    <TextField 
                        name="email" 
                        type='email'
                        className="register__input" 
                        label="Email" 
                        variant="outlined" 
                        placeholder='Email' 
                        {...register("email", {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Enter a valid email"
                            }
                    })} 
                        error={!!errors?.email}                 
                        helperText={errors?.email ? errors.email.message : null}
                    />

                    <TextField 
                        name="password" 
                        type='password'
                        className="register__input" 
                        label="Password" 
                        variant="outlined" 
                        placeholder='Password' 
                        {...register('password', {
                            required: "You must specify a password",
                            minLength: {
                              value: 8,
                              message: "Password must have at least 8 characters"
                            }
                        })}
                        error={!!errors?.password}                 
                        helperText={errors?.password ? errors.password.message : null}
                    />

                    <TextField 
                        name="password_repeat" 
                        type='password'
                        className="login__input" 
                        label="Repeat password" 
                        variant="outlined" 
                        placeholder='Repeat password' 
                        {...register('password_repeat',{
                            validate: value =>
                              value === getValues().password || "The passwords do not match"
                          })}
                        error={!!errors?.password_repeat}                 
                        helperText={errors?.password_repeat ? errors.password_repeat.message : null}
                    />
                    
                    <button disabled={loader} className="register__button" >
                        {
                        loader ? 
                        <CircularProgress size={20} sx={{color: 'white'}}/> :
                        'Sign up!'
                        }
                     </button>
                </form>
                <p className="register__info">Already have an account? <Link to='/login'>Sign in!</Link></p>
                
            </div>
        </div>
    )
}