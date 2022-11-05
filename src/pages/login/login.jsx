import { useState } from 'react'
import './login.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/authSlice';
import { RocketLaunch } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { border } from '@mui/system';


export default function Login() {

    const [error, setError] = useState(false)
    const [loginData, setLoginData] = useState({})

    const dispatch = useDispatch()

    const navigate = useNavigate()


    function onChange(e) {
        setLoginData(prevValue => {
            return {
                ...prevValue, 
                [e.target.name]: e.target.value
            }
        })
    }

    function handleLogin(e) {
        e.preventDefault()
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch(signIn(user.providerData[0]))
            navigate('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(true)
            console.log(errorCode)
            console.log(errorMessage)
        });
    }



    return (
        <div className="login">
            <div className="login__wrapper">
                <div className="login__logo">
                    <RocketLaunch className='login__logo-icon' sx={{fontSize: '2.5rem'}} />
                    <h1 className="login__logo-text"><span className="login__logo-text--highlight">Space</span>Admin</h1>
                </div>
                <form className="login__form" onSubmit={handleLogin}>
                    <TextField 
                        id="outlined-basic" 
                        name="email" 
                        type='email'
                        className="login__input" 
                        label="Email" 
                        variant="outlined" 
                        placeholder='Email' 
                        onChange={onChange} 
                    />
                    <TextField 
                        id="outlined-basic" 
                        name="password" 
                        type='password'
                        className="login__input" 
                        label="Password" 
                        variant="outlined" 
                        placeholder='Password' 
                        onChange={onChange} 
                    />

                    <button className="login__button">Login</button>
                </form>
                <p className="login__signup-info">Don't have an account yet? <Link to='/register'>Sign up!</Link></p>
                {error && <p className="login__error-msg">Wrong email or password</p>}
            </div>
        </div>
    )
}