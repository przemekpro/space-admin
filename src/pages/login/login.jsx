import { useState } from 'react'
import './login.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/authSlice';
import { RocketLaunch } from '@mui/icons-material';
import { CircularProgress, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { doc, getDoc } from 'firebase/firestore';


export default function Login() {

    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(false)

    const { register, handleSubmit, getValues, formState: {errors} } = useForm();


    const dispatch = useDispatch()
    const navigate = useNavigate()


    async function handleLogin() {
        setLoader(true)
        try {
            const res = await signInWithEmailAndPassword(auth, getValues().email, getValues().password)
            const user = res.user
            const fetch = await getDoc(doc(db, "registeredUsers", user.uid))
            const data = fetch.data()
            dispatch(signIn({...data, timeStamp: data.timeStamp.seconds}))
            navigate('/')
        } catch(e) {
            setLoader(false)
            setError(true)
            console.log(e)
        }
    }


    return (
        <div className="login">
            <div className="login__wrapper">
                <div className="login__logo">
                    <RocketLaunch className='login__logo-icon' sx={{fontSize: '2.5rem'}} />
                    <h1 className="login__logo-text"><span className="login__logo-text--highlight">Space</span>Admin</h1>
                </div>
                <form className="login__form" onSubmit={handleSubmit(handleLogin)}>
                    <TextField 
                        name="email" 
                        type='email'
                        className="login__input" 
                        label="Email" 
                        variant="outlined" 
                        placeholder='Email' 
                        {...register('email', {
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
                        className="login__input" 
                        label="Password" 
                        variant="outlined" 
                        placeholder='Password' 
                        {...register('password', {
                            required: "Password is required",
                        })}
                        error={!!errors?.password}                 
                        helperText={errors?.password ? errors.password.message : null}
                    />

                    <button className="login__button" >
                        {
                        loader ? 
                        <CircularProgress size={20} sx={{color: 'white'}}/> :
                        'Sign in!'
                        }
                    </button>
                </form>
                <p className="login__signup-info">Don't have an account yet? <Link to='/register'>Sign up!</Link></p>
                {error && <p className="login__error-msg">Wrong email or password</p>}
            </div>
        </div>
    )
}