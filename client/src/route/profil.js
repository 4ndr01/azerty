import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
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




    const handleSubmit = (e) => {


        e.preventDefault();
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



                //rediriger vers la page d'accueil
                navigate('/login')
            })
            .catch(err => console.log(err))




    };

    const handlesubmit2 = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        const requestOptions2 = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({image: formData})
        }

        fetch(`http://localhost:3001/users/${user.image}`, requestOptions2)
            .then(response => response.json())
            .then(data => {
                    setUser({
                        ...user,
                        image: data.image
                    })
                }
            )
            .catch(err => console.log(err))

    }

    const [email, setEmail] = useState('');

    const handlepasswordChange = (e) => {
        setEmail(e.target.value);

    }



    return (
        <section className="wrapper">
            <h1>Profil</h1>
            <form>

                <img src={user?.image} alt="avatar"/>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handlesubmit2}>Envoyer</button>


                <p>Identifiant: {user?.username}</p>
                <input
                    type="text"
                    value={username}
                    placeholder="Nouvel identifiant"
                    onChange={handleUsernameChange}
                />
                <p>{appContext.errorMessage}</p>


                <button onClick={handleSubmit}>Envoyer</button>


            </form>



            <style jsx>{`
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











