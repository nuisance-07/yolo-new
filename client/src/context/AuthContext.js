import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                axios.defaults.headers.common['x-auth-token'] = token;
                try {
                    const res = await axios.get('http://localhost:5000/api/auth/user');
                    setUser(res.data);
                    setIsAuthenticated(true);
                } catch (err) {
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    setIsAuthenticated(false);
                    delete axios.defaults.headers.common['x-auth-token'];
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    const login = async (email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', body, config);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            setError(null);
            return true;
        } catch (err) {
            setError(err.response.data.msg);
            return false;
        }
    };

    const register = async (name, email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ name, email, password });

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            setError(null);
            return true;
        } catch (err) {
            setError(err.response.data.msg);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        delete axios.defaults.headers.common['x-auth-token'];
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated,
            loading,
            error,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
