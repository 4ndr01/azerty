import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {AppContext, AppProvider} from '../context/appContext'
import Login from "./login";
import Signup from "./signup";

export default function Profil({Router}) {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();

console.log(appContext.currentUser)

//recupere le token dans le localstorage
    Login.data = JSON.parse(localStorage.getItem('token'))
    console.log(Signup.data)
    console.log(Login.data)
    //recupérer les info dans la bdd
    const [user, setUser] = useState(
        {
            username: '',
            email: ''
        }
    );

    useEffect(() => {


        if (appContext.currentUser) {
            setUser(appContext.currentUser)
            console.log(appContext.currentUser)
        }

    }, [appContext.currentUser, appContext])

    //modifier les info dans la bdd
    const inputChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //envoie des info dans la bdd
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        }
        fetch(`http://localhost:3001/profile?username=${user.username}&password=${user.email}`).then(r => r.json()).then(data => {
            console.log(data)
            setUser(data)

        })










    return (
        <section className="wrapper">
            <h1>Profil</h1>
            <form >
                <p>Identifiant: {user?.username}</p>
                <input  placeholder={"Modifier votre identifiant"} type="text" name="username" value={user.username} onChange={inputChange} />
                <p>Email: {user?.email}</p>
                <button onSubmit={handleSubmit} type="submit">Modifier</button>
            </form>



            <style jsx>{`
            
                .wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }
                h1 {
                    font-size: 2rem;
                    
                }
                p {
                    font-size: 1.5rem;
                }
                
                form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    max-width: 500px;
                    margin: 0 auto;
                }
                input {
                    width: 100%;
                    padding: 1rem;
                    margin: 1rem 0;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 1rem;
                }
                button {
                    width: 100%;
                    padding: 1rem;
                    margin: 1rem 0;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 1rem;
                    background-color: #ccc;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #aaa;
                }
                
                /*responsive*/
                @media (max-width: 768px) {
                    .wrapper {
                        height: 100%;
                        width: 100%;
                    }
                    
                }
            `}</style>

        </section>




    );


}











