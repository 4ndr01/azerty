import "./App.css";
import React, { Component } from "react";
import Switch from "react-switch";
import io from "socket.io-client";
import {useEffect, useState} from "react";
import {BrowserRouter, Link, redirect, Route, useNavigate} from 'react-router-dom';
import darkMode from '../src/darkMode.css';
import Login from "./route/login";
import api from "./context/apiContext";

import {AppContext} from "./context/appContext";

const socket = io("http://localhost:3001");












function App() {
    const navigate = useNavigate();

    //recupere le token dans le localstorage



    const [user, setUser] = useState(
        {
            username: '',
            image: '',
        }
    );

    //afficher

    useEffect(() => {

        if (appContext.currentUser) {
            setUser(appContext.currentUser)
            console.log(appContext.currentUser)
        }

    }
    , [appContext.currentUser, appContext])



    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        navigate('/login')
    }


    //recupere le token dans le localstorage
    const token = localStorage.getItem('token')




    const [roomName, setRoomName] = useState('');
    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);

    }
    const [messages, setMessages] = useState([]);





    function setNewMessage(msg) {
        setMessages([
            ...messages,
            msg
        ]);
    }


    socket.on('TEST_MSG', msg => {
        setNewMessage(msg);

    });

    function sendMessage(e, message) {
        e.preventDefault();
        if (e.target.text.value === '') {
            return;
        }


        const msg = {
            username: user.username,
            image: user.image,
            text: e.target.text.value,

        };
        socket.emit('CLIENT_MSG', msg);

    }







    return (

        <div className="App">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="wrapper">
                               <img src={user.image}/>
                                <h2>Bonjour {token}</h2>
                                <Link to={'/profil'}>Profil</Link>
                                <button onClick={logout}>Logout</button>



                            </div>
                            <div className="card-title">My first chat</div>
                            <hr/>
                            <div className="messages">
                                {messages.map(msg => {
                                    return (

                                        <div className="msg"><img className="img_chat" src={msg.image}/> <p className="user">{msg.username}</p><p className="text">{msg.text}</p>

                                        </div>










                                    )
                                })}
                            </div>
                        </div>
                        <form onSubmit={e => sendMessage(e)}>
                            <div className="card-footer">

                                <br/>
                                <input id="text"
                                       type="text"
                                       placeholder="Your message"
                                       className="form-control"
                                />
                                <br/>
                                <div className="clearfix">
                                    <button type="submit"
                                            className="submit">
                                        send
                                    </button>




                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
            <style jsx="true">{`
                .App {
                    text-align: center;
                    
                }
                .msg {
                    margin-bottom: 10px;
                    padding: 10px;
                    background-color: #f5f8fa;
                    .user {
                        font-weight: bold;
                        font-size: 20px;
                        color: #172b4d;
                        display: inline-block;
                      
                    }
                    .text {
                        font-size: 15px;
                        color: #172b4d;
                        
                    }
                    .img_chat {
                        width: 50px;
                        height: 50px;
                        
                        border-radius: 50%;
                        
                    }
                   
                   
                   
                    
                }
                
                img{
                    width: 100px;
                    height: 100px;
                    background-image: url("https://static.vecteezy.com/ti/vecteur-libre/t2/12040969-creation-de-logo-de-lettre-sms-avec-un-fond-blanc-dans-l-illustrateur-style-de-chevauchement-de-polices-de-l-alphabet-moderne-du-logo-dessins-de-calligraphie-pour-logo-affiche-invitation-etc-vectoriel.jpg");
                    background-position: center;
                    
                    border-radius: 50%;
                }
                  
                
                
                .clearfix {
                    display: flex;
                    justify-content: space-between;
                    
                    
                }
                .card {
                    margin-top: 20px;
                    background-color: #f5f8fa;
                    border: none;
                    
                }
                .card-body {
                    padding: 30px;
                    text-align: left;
                    
                }
                .card-title {
                    font-weight: bold;
                    font-size: 30px;
                    color: #172b4d;
                    
                }
                .card-footer {
                    padding: 0 30px 30px 30px;
                    border-bottom-left-radius: 3px;
                    border-bottom-right-radius: 3px;
                    
                }
                .messages {
                    height: 300px;
                    overflow-y: scroll;
                    margin-bottom: 20px;
                  
                }
                .wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    
                    background: #f5f5f5;
                    
                }
                .wrapper h1 {
                    font-size: 2rem;
                    font-weight: 400;
                    margin-bottom: 1rem;
                    
                }
                .wrapper h2 {
                    font-size: 1.5rem;
                    font-weight: 400;
                    margin-bottom: 1rem;
                    
                }
                
                
                
                button {
                    background: black;
                    border: none;
                    color: #fff;
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    cursor: pointer;
                    margin-top: 1rem;
                    
                }
                input {
                    width: 100%;
                    padding: 0.5rem;
                    margin-top: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 0.25rem;
                    
                }
                /*animation*/
                .wrapper {
                    animation: fadeIn ease 5s;
                    animation-iteration-count: 1;
                    animation-fill-mode: forwards;
                    
                }
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
                .theme-button {
                    background: #172b4d;
                    color: #fff;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    cursor: pointer;
                    margin-top: 1rem;
                    margin-left: 1rem;
                    
                }
                .enter-room-button {
                    background: #172b4d;
                    color: #fff;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    cursor: pointer;
                    margin-top: 1rem;
                    margin-left: 1rem;
                }
                .input_room {
                    width: 100%;
                    padding: 0.5rem;
                    margin-top: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 0.25rem;
                    
                }
                .room {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    
                }
                /*responsive*/
                @media (max-width: 768px) {
                    .wrapper {
                        width: 100%;
                        padding: 0;
                        
                    }
                    
                }
                /*responsive tchat*/
                @media (max-width: 768px) {
                    .card {
                        width: 100%;
                        padding: 0;
                        
                    }
                }
                
                /*responsive room*/
                @media (max-width: 768px) {
                    .room {
                        width: 100%;
                        padding: 0;
                        
                    }
                }
                
                
                
                
                
            `}</style>
        </div>
    );


}
export default App;
