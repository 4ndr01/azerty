import {createContext} from "react";
import {createBrowserRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import Login from "../route/login";
import App from "../App";
import {RouterProvider} from "react-router-dom";
import Signup from "../route/signup";
import Profil from "../route/profil";

export const AppContext = createContext(undefined);

export function AppProvider({children}) {





    //login
    const [user, setUser] = useState({
        loggedIn:false,
    });

    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/',
            element: user.loggedIn ? (<App />) : (<Login />)
            

        },

        {
            path:'/home',
            element: <App />

        },
        {
            path:'/signup',
            element: <Signup />
        },
        {
            path:'/profil',
            element: <Profil />
        }
    ]);


    return (
        <AppContext.Provider value={{

            user, setUser}}>
            {children}
            <RouterProvider router={router} />
        </AppContext.Provider>
    )
}

