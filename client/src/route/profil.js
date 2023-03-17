import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {AppContext, AppProvider} from '../context/appContext'
import Login from "./login";
import Signup from "./signup";

export default function Profil({Router}) {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();



//recupere le token dans le localstorage
    Login.data = JSON.parse(localStorage.getItem('token'))
    console.log(Signup.data)
    console.log(Login.data)
    //recupérer les info dans la bdd
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    }
    );

   const informationDB = async () => {
       const requestOptions = {
              method: 'GET',
                headers: { 'Content-Type': 'application/json' },
       }
         const response = await fetch(`http://localhost:3001/profil?username=${user.username}&password=${user.password}&email${user.email}`, requestOptions);
       console.log(response)
   }


    return (
        <section className="wrapper">
            <h1>Profil</h1>
            <p>Pseudo : {informationDB(user.username)}</p>
            <p>Email : {Signup.data}</p>
            <p>Mot de passe : {user.password}</p>

        </section>
    );

}











