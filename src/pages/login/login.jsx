import { useState } from 'react'
import './login.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const [error, setError] = useState(false)
    const [loginData, setLoginData] = useState({})

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
            console.log(user)
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
            <form className="login__form" onSubmit={handleLogin}>
                <input name='email' placeholder='email' type="email" className="login__input" onChange={onChange}/>
                <input name='password' placeholder='password' type="password" className="login__input" onChange={onChange}/>
                <button className="login__button">Login</button>
            </form>
            {error && <p className="login__error-msg">Wrong email or password</p>}
        </div>
    )
}