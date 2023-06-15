import React, {useContext, useEffect, useState} from "react";
import {Link, redirect, useNavigate} from 'react-router-dom';
import {AppContext, AppProvider} from '../context/appContext'
import Login from "./login";
import Signup from "./signup";

export default function Profil() {
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
            email: '',
            image: ''
        }
    );

    useEffect(() => {


        if (appContext.currentUser) {
            setUser(appContext.currentUser)
            console.log(appContext.currentUser)
        }

    }, [appContext.currentUser, appContext])




//modifier le username
    const [username, setUsername] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }



    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const [errorMessage, setErrorMessage] = useState('');
    const ShowError = (message) => {
        setErrorMessage(message);
    }
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*]/;


    const handleSubmit = (e) => {


        e.preventDefault();
        if (username === '') {
            ShowError('Veuillez remplir tous les champs')
            //ne pas envoyer les données
            return;
        }
        if (username.length < 6) {
            ShowError('Le nom d\'utilisateur doit contenir au moins 6 caractères')
            //ne pas envoyer les données
            return;
        }


        else {

        const formData = new FormData();
        formData.append('file', selectedFile);

        //envoyer les données dans la bdd
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: username})
        };
        fetch(`http://localhost:3001/users/${user.username}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)



                //mettre à jour le context
                appContext.setCurrentUser({
                    ...appContext.currentUser,
                    username: data.username
})
                setUser({
                    ...user,
                    username: data.username
            })
                console.log(appContext.currentUser)
            })
            .catch(err => console.log(err))
        ShowError('Votre identifiant a bien été modifié veuillez vous reconnecter')
        //si le champ est vide

    }
    }



    //rediriger vers la page login
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }



    const token = localStorage.getItem('token')
    const token2 = localStorage.getItem('token2')

    const logout = (e) => {
        e.preventDefault();
        appContext.setCurrentUser(null)
        appContext.user.loggedIn = false;
        localStorage.removeItem('token')
        navigate('/login')
    }



    return (
        <section className="wrapper">
            <form>
                <button className="logout" onClick={logout}>Logout</button>

                <h1>Profil</h1>



                <img src={user?.image}/>

            </form>

            <form>
                <p>Mot de passe</p>
                <input className="input" type="password" value={user?.password} placeholder="Mot de passe" disabled/>
                <p>Identifiant: {token}</p>
                <input
                    type="text"
                    value={username}
                    placeholder="Nouvel identifiant"
                    onChange={handleUsernameChange}
                />
                <p className="error2">{errorMessage}</p>


                <button onClick={handleSubmit}>Envoyer</button>

            </form>





            <style jsx>{`
                  .input {
                  border: none;
                  }
                  .logout {
                    background-color: #ccc;
                    border: none;
                    padding: 1rem;
                    border-radius: 5px;
                    font-size: 1rem;
                    margin-bottom: 1rem;
                    
                  }
                  .logout:hover {
                    background-color: black;
                    color: white;
                    cursor: pointer;
                    transition: 0.5s;
                    
                  }
                  .error2 {
                    color: green;
                    
                  }
               img{
                    width: 100px;
                    height: 100px;
                    background-image: url("https://static.vecteezy.com/ti/vecteur-libre/t2/12040969-creation-de-logo-de-lettre-sms-avec-un-fond-blanc-dans-l-illustrateur-style-de-chevauchement-de-polices-de-l-alphabet-moderne-du-logo-dessins-de-calligraphie-pour-logo-affiche-invitation-etc-vectoriel.jpg");
                    background-position: center;
                    
                    border-radius: 50%;
                }
            
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
                
                /*responsive*/
                @media (max-width: 500px) {
                    h1 {
                        font-size: 1.5rem;
                    }
                    p {
                        font-size: 1rem;
                    }
                    form {
                        width: 100%;
                        max-width: 100%;
                      
                    }
                    input {
                        font-size: 1rem;
                    }
                    button {
                        font-size: 1rem;
                    }
                }
                /*responsive*/
                @media (max-width: 400px) {
                    h1 {
                        font-size: 1.2rem;
                    }
                    p {
                        font-size: 0.8rem;
                    }
                    form {
                        width: 100%;
                    }
                }
            `}</style>

        </section>




    );


}











