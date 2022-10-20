import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../UserContext/UseerContext';
import './Login.css'

const Login = () => {

    const { signIN, signUpWithGoogle } = useContext(AuthContext);

    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogle = () => {
        signUpWithGoogle()
            .then(result => {
                const user = result.user;
                // console.log(user);
                navigate(from, {replace: true});
            })
            .catch(error => console.error(error));
    }

    const handleForm = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIN(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                navigate('/orders')
            })
            .catch(error => {
                console.error(error);
                setError('Your email or password does not match. Please try again');
            });
    }
    return (
        <div className='form-container'>
            <h1 className='form-title'>Login</h1>
            <form onSubmit={handleForm}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input className='email' type="email" name='email' placeholder='email' required />
                </div>

                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input className='password' type="password" name='password' placeholder='password' required />
                </div>

                <button className='login-button'>Login</button>
            </form>

            <p className='error-text'>{error}</p>

            <p><small>Don't have an account? <Link to='/signup'>Sign Up</Link></small></p>

            <button onClick={handleGoogle} className='login-button'>Google</button>
        </div>
    );
};

export default Login;