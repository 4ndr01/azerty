import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {AppContext, AppProvider} from '../context/appContext'
import {ErrorMessage} from "../context/utils";
import Profil from "./profil";
import app from "../App";

export default function Login({Router}) {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: ''
        }
    );

    const [errorMessage, setErrorMessage] = useState('');


    const showError = (message) => {
        setErrorMessage(message);
    }

    useEffect(() => {

        if (appContext.currentUser) {
            console.log(appContext.currentUser)
            navigate('/home')
        }

    }, [appContext.currentUser])

    const onSubmit = async e => {
        e.preventDefault();
        //verifications
        if (user.username === '' || user.password === '') {
            showError('Veuillez remplir tous les champs')
            localStorage.setItem('token', JSON.stringify(user.username))

            return
        }

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify(user)
        };
        const response = await fetch(`http://localhost:3001/signin?username=${user.username}&password=${user.password}`, requestOptions);

        const data = await response.json();


        console.log(data)

        //verifier si le user existe
        if (data) {
            appContext.setCurrentUser(data)
            appContext.user.loggedIn = true;
        }else {
            ErrorMessage('Identifiant ou mot de passe incorrect')

        }
    }


    return (
        <section className="wrapper">
            <h1>Login</h1>
            <form onSubmit={onSubmit} >


                <ul>
                    <li>
                        <label>Identifiant</label>
                        <input  onChange={e => setUser({...user, [e.target.name]: e.target.value})} type="text" value={user.username} name='username'/>

                    </li>
                    <li>
                        <label>Mot de passe</label>
                        <input onChange={e => setUser({...user, [e.target.name]: e.target.value})} type="password" value={user.password} name='password'/>

                    </li>
                    <p className="error">{errorMessage}</p>
                    <button   type="submit">Connexion</button>
                    <Link to={'/signup'}>Nouveau ?</Link>

                </ul>
              
            </form>
            <style jsx>{`
                .error {
                    color: red;
                }
                .wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    width: 100vw;
                    background: #f5f5f5;
                }
                .wrapper h1 {
                    font-size: 2rem;
                    font-weight: 400;
                    margin-bottom: 1rem;
                }
                .wrapper form {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    max-width: 400px;
                    background: #fff;
                    padding: 2rem;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .wrapper form ul {
                    display: flex;
                    
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .wrapper form ul li {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    margin-bottom: 1rem;
                    
                }
                .wrapper form ul li label {
                    font-size: 1rem;
                    font-weight: 400;
                    margin-bottom: 0.5rem;
                    
                }
                .wrapper form ul li input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    outline: none;
                    font-size: 1rem;
                    font-weight: 400;
                    
                }
                .wrapper form ul li button {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    outline: none;
                    font-size: 1rem;
                    font-weight: 400;
                    background: #fff;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                  
                }
                .wrapper form ul li button:hover {
                    background: #f5f5f5;
                }
                .wrapper form ul li a {
                    font-size: 0.8rem;
                    font-weight: 400;
                    color: #333;
                    text-decoration: none;
                    margin-top: 1rem;
                    
                }
                .wrapper form ul li a:hover {
                    color: #000;
                    
                }
                button {
                    background: #fff;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 0.5rem;
                    font-size: 1rem;
                    font-weight: 400;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    
                }
                button:hover {
                    background: black;
                    color: #fff;
                }
                /* animation */
                .wrapper {
                    animation: fadeIn 0.5s ease-in-out;
                    
                }
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
                }
                
                `}</style>
        </section>

    )


}


