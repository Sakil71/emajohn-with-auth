import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../components/UserContext/UseerContext';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation();

    if(loading){
        return <p>loading...</p>
    }
    if(user && user.email){
        return children;
    }
    return (
        <div>
            <Navigate to='/login' state={{from: location}} replace></Navigate>
        </div>
    );
};

export default PrivateRoute;