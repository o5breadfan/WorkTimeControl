import React, { createContext, useState } from "react";
import useLocalStorage from '../hooks/useLocalStorage.jsx'

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', window.localStorage.getItem('currentUser') || null);
    const [token, setToken] = useState(document.cookie.split('=')[1] || null);
    const signin = (newUser, cb) => {
        setCurrentUser({
            id: newUser.id,
            roleId: newUser.roleId,
            departmentId: newUser.departmentId
        });
        setToken(document.cookie.split('=')[1])
        cb();
    }
    const signout = (cb) => {
        setCurrentUser(null);
        setToken(null);
        cb();
    }

    //TODO: decode jwt ?
    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    const value = {currentUser, signin, signout, token, parseJwt}

    return <AuthContext.Provider value={value}> 
            {children}
        </AuthContext.Provider>;
}



