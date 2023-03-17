import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {AppContext, AppProvider} from '../context/appContext'
import Login from "./login";

export default function Profil({Router}) {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();





    return (
        <section className="wrapper">
            <h1>Profil</h1>
        </section>
    );

}











