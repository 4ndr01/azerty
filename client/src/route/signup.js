import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppContext} from '../context/appContext'

export default function Signup() {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();



   //method Post
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});


    const onSubmit = async e => {
        e.preventDefault();

        if (user.password !== user.password2) {
            console.log('Les mots de passe ne correspondent pas')
            alert('Les mots de passe ne correspondent pas')
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            const response = await fetch('http://localhost:3001/signup', requestOptions);
            const data = await response.json();
            localStorage.setItem('token', JSON.stringify(user.email))


            // TODO: check if user is in database
            if (data === true) {
                alert('vous avez déjà un compte')
            }

            if (appContext.user.loggedIn === false) {
                navigate('/home')
            }

        }
    }

    return (
        <section  className="wrapper">
            <h1>Inscription</h1>
            <form  onSubmit={onSubmit}>
                <ul>
                    <li>
                        <label>Identifiant</label>
                        <input type="text" value={user.username} onChange={onChange} name='username'/>
                    </li>
                    <li>
                        <label>Email</label>
                        <input type="email" value={user.email} onChange={onChange} name='email'/>
                    </li>
                    <li>
                        <label>Mot de passe</label>
                        <input type="password" value={user.password} onChange={onChange} name='password'/>
                    </li>
                    <li>
                        <label>Confirmer le mot de passe</label>
                        <input type="password" value={user.password2} onChange={onChange} name='password2'/>
                    </li>
                    <button  type="submit">S'inscrire</button>
                    <a href="/login">Déjà un compte ?</a>
                </ul>
            </form>
            <style jsx>{`
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
                    
                }
                .wrapper form ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    max-width: 400px;
                  
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
                    font-size: 1.2rem;
                    font-weight: 400;
                    margin-bottom: 0.5rem;
                    
                }
                .wrapper form ul li input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    outline: none;
                    font-size: 1.2rem;
                    font-weight: 400;
                    transition: all 0.2s ease-in-out;
                    
                }
                .wrapper form ul li input:focus {
                    border: 1px solid #333;
                }
                .wrapper form ul li button {
                    width: 100%;
                    padding: 0.5rem;
                    border: none;
                    border-radius: 4px;
                    outline: none;
                    font-size: 1.2rem;
                    font-weight: 400;
                    background: #333;
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    
                }
                .wrapper form ul li button:hover {
                    background: #000;
                }
                .wrapper form ul li a {
                    font-size: 1.2rem;
                    font-weight: 400;
                    color: #333;
                    text-decoration: none;
                    transition: all 0.2s ease-in-out;
                    
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
                    background-color: black;
                    color: #fff;
                      
                      
                }
                
                `}</style>
        </section>
    )

}

