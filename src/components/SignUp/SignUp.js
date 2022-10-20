import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../UserContext/UseerContext';

const SignUp = () => {
    const { user, signUpWithGoogle, signUpWithEmailAndPassword } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    // Sign Up with google
    const handleGoogleSignUp = () => {
        signUpWithGoogle()
            .then(result => {
                const user = result.user;
                // console.log(user);
                setSuccess('Successfully Sign up');
                navigate('/shop');
            })
            .catch(error => console.error(error));
    }

    // Sign Up with email and password
    const handleSignUpSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        if (password.length < 6) {
            setError('Password should be more than 6 characters');
            return;
        }
        if (password !== confirm) {
            setError("Youre password dose't match");
            return;
        }

        signUpWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess('Successfully Sign Up');
                navigate('/');
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Sign Up</h1>
            <form onSubmit={handleSignUpSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input className='email' type="email" name='email' placeholder='email' required />
                </div>

                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input className='password' type="password" name='password' placeholder='password' required />
                </div>

                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input className='password' type="password" name='confirm' placeholder='confirm password' required />
                </div>

                <button className='login-button'>Sign Up</button>

            </form>

            {
                user?.uid ? 
                <p>{success}</p> 
                :
                <p className='error-text'>{error}</p>
            }

            <p><small>Already Have an Account? <Link to='/login'>Log in</Link></small></p>

            <button onClick={handleGoogleSignUp} className='login-button'>Google</button>
        </div>
    );
};

export default SignUp;