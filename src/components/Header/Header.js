import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { AuthContext } from '../UserContext/UseerContext';
import './Header.css';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const [signOut, setsignOut] = useState(null);

    const handleLogout = () =>{
        logOut()
        .then(result =>{
            setsignOut('Successfully sign out');
        })
        .catch(error=> console.log(error))
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? 'active' : undefined} to="/Orders">Orders</NavLink>
                <NavLink to="/inventory">Inventory</NavLink>
                <NavLink to="/about">About</NavLink>
                {
                    user?.uid ?
                    <button className='logout-button' onClick={handleLogout}>Logout</button>
                    :
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/signup">Sign up</NavLink>
                        </>
                }
            </div>
        </nav>
    );
};

export default Header;