import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import './register.scss'

export default function Register() {

    function handleRegister(e) {
        e.preventDefault()
    }

    return(
        <div className="register">
            <div className="register__wrapper">
                <h2 className="register__title">Create new account</h2>
                <form onSubmit={handleRegister} className="register__form">
                    <TextField 
                        id="outlined-basic" 
                        name="email" 
                        type='email'
                        className="register__input" 
                        label="Email" 
                        variant="outlined" 
                        placeholder='Email' 
                    />

                    <TextField 
                        id="outlined-basic" 
                        name="password" 
                        type='password'
                        className="register__input" 
                        label="Password" 
                        variant="outlined" 
                        placeholder='Password' 
                    />

                    <TextField 
                        id="outlined-basic" 
                        name="password-repeat" 
                        type='password'
                        className="login__input" 
                        label="Repeat password" 
                        variant="outlined" 
                        placeholder='Repeat password' 
                    />
                    <button className="register__button">Sign up!</button>
                </form>
                <p className="register__info">Already have an account? <Link to='/login'>Sign in!</Link></p>
            </div>
        </div>
    )
}