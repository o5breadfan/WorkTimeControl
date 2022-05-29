import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import React from "react";

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const {token, parseJwt} = useAuth();
    

    if(location.pathname === '/')
        return token ? <Navigate to='request/list' /> : children;
    else {
        if(!token) {
            return <Navigate to='/' state={{from: location}} />
        }

        return children;
    }
}

export {RequireAuth}