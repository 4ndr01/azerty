import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {AppContext, AppProvider} from '../context/appContext'
import Login from "./login";

export default function Profil({Router}) {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();



//recupere le token dans le localstorage
    Login.data = JSON.parse(localStorage.getItem('token'))

    console.log(Login.data)


    return (
        <section className="wrapper">
            <h1>Profil</h1>
            <p>Pseudo : {Login.data}</p>

        </section>
    );

}











