import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(Cookies.get('session') || null);

    useEffect(() => {
        Cookies.set('session', session);
    }, [session]);

    const login = (userId) => {
        setSession(userId);
    };

    const logout = () => {
        setSession(null);
    };

    return (
        <SessionContext.Provider value={{ session, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionProvider;
